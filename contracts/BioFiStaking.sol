// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "./BioFiToken.sol";
import "./BioFiCollection.sol";

contract BioFiStaking is Ownable, IERC721Receiver {
    uint256 public totalStaked;

    struct Stake {
        uint24 tokenId;
        uint48 timestamp;
        address owner;
    }

    event NFTStaked(address owner, uint256 tokenId, uint256 value);
    event NFTUnstaked(address owner, uint256 tokenId, uint256 value);
    event Claimes(address owner, uint256 amount);

    BioFiCollection nft;
    BioFiToken token;

    // Lie le tokenId a la structure Stake
    mapping(uint256 => Stake) public vault;

    constructor(BioFiCollection _nft,   BioFiToken _token) {
        nft = _nft;
        token = _token;
    }

    function stake(uint256[] calldata tokenIds) external {
        uint256 tokenId;
        totalStaked += tokenIds.length;

        // Pour chaque tokenId passé, l'intègre dans le staking.
        for (uint256 i = 0; i < tokenIds.length; i++) {
            tokenId = tokenIds[i];
            require(nft.ownerOf(tokenId) == msg.sender, "Not your NFT.");
            require(vault[tokenId].tokenId == 0, "NFT already staked.");

            // Transfere le NFT du user au contrat et emmit l'event.
            nft.transferFrom(msg.sender, address(this), tokenId);
            emit NFTStaked(msg.sender, tokenId, block.timestamp);

            // Ajoute un nouveau Stake dans le Vault avec les infos de dessus.
            vault[tokenId] = Stake({
                owner: msg.sender,
                tokenId: uint24(tokenId),
                timestamp: uint48(block.timestamp)
            });
        }
    }

    // N'est pas appellable par le user. Le user claim d'abord puis choisit s'il veut unstake.
    function _unstakeMany(address account, uint256[] calldata tokenIds)
        internal
    {
        uint256 tokenId;
        totalStaked -= tokenIds.length;
        for (uint256 i = 0; i < tokenIds.length; i++) {
            tokenId = tokenIds[i];
            Stake memory staked = vault[tokenId];
            require(staked.owner == msg.sender, "Not an owner.");
            delete vault[tokenId];
            emit NFTUnstaked(account, tokenId, block.timestamp);
            nft.transferFrom(address(this), account, tokenId);
        }
    }

    // Claim permet au user de recuperer ses gains du staking et d'unstake s'il veut.

    function _claim(
        address account,
        uint256[] calldata tokenIds,
        bool _unstake
    ) internal {
        uint256 tokenId;
        uint256 earned = 0;
        for (uint256 i = 0; i < tokenIds.length; i++) {
            tokenId = tokenIds[i];
            Stake memory staked = vault[tokenId];
            require(staked.owner == msg.sender, "Not an owner.");
            uint256 stakedAt = staked.timestamp;
            // Calcule le gain par rapport à la date de debut de stake et le claim.
            earned += (100 ether * (block.timestamp - stakedAt)) / 1 days;
            vault[tokenId] = Stake({
                owner: account,
                tokenId: uint24(tokenId),
                timestamp: uint48(block.timestamp)
            });

            // Possibilité de mettre des conditions du genre montant minimum.
            if (earned > 0) {
                earned = earned / 10000;
                // Appelle le contract ERC20 pour récupérer le gain.
                token.mint(account, earned);
            }

            if (_unstake) {
                _unstakeMany(account, tokenIds);
            }

            emit Claimes(account, earned);
        }
    }

    // Permet au user d'avoir connaissance de ses gains jusqu'ici.

    function earningInfo(uint256[] calldata tokenIds)
        external
        view
        returns (uint256  info)
    {
        uint256 tokenId;
        uint256 earned = 0;
        for (uint256 i = 0; i < tokenIds.length; i++) {
            Stake memory staked = vault[tokenId];
            uint256 stakedAt = staked.timestamp;
            earned += (10000 ether * (block.timestamp - stakedAt)) / 1 days;
        }
        return(earned);
    }

    // Combien de NFTs staked par le user.
    function balanceOf(address account) public view returns (uint256) {
        uint256 balance = 0;
        uint256 supply = nft.totalSupply();
        for (uint256 i = 1; i <= supply; i++) {
            if (vault[i].owner == account) {
                balance += 1;
            }
        }
        return balance;
    }

    // Quels NFTs staked par le user.
    function tokensOfOwners(address account)
        public
        view
        returns (uint256[] memory ownerTokens)
    {
        uint256 supply = nft.totalSupply();
        uint256[] memory tmp = new uint256[](supply);
        uint256 index = 0;

        // Creer une supply, boucle sur la vraie supply en partant de 0 et rajoute dans le tmp chaque token detenu par le user.
        for (uint256 tokenId = 1; tokenId < supply; tokenId++) {
            if (vault[tokenId].owner == account) {
                tmp[index] = vault[tokenId].tokenId;
                index += 1;
            }
        }

        // A tester, peut être inclus dans la fonction de dessus.
        uint256[] memory tokens = new uint256[](index);
        for (uint256 i = 0; i < index; i++) {
            tokens[i] = tmp[i];
        }

        return tokens;
    }

    // Obligatoire
    function onERC721Received(
        address,
        address from,
        uint256,
        bytes calldata
    ) external pure override returns (bytes4) {
        require(from == address(0x0), "Cannot send nfts to Vault directly");
        return IERC721Receiver.onERC721Received.selector;
    }
}
