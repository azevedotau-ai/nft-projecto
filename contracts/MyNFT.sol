pragma solidity >=0.6.0 <0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyNFT is ERC721 {
    using SafeMath for uint256;

    address payable public owner;

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // Mapping from token ID to the owner sale price
    mapping(uint256 => uint256) private tokenSalePrice;
    // Mapping from token ID to the creator's address
    mapping(uint256 => address) private tokenCreator;
    // Mapping from token ID to owner
    mapping (uint256 => address) private tokenOwner;

    uint256 public maintainerPercentage = 30;
    uint256 public creatorPercentage = 100;



    constructor() public ERC721("AE Studio NFT", "Made with <3 by AE Studio") {}


    function mintNFT(string memory tokenURI, uint256 _salePrice, address tokenCreatorAdd)
        public
        returns (uint256)
    {
        address player = msg.sender;
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _safeMint(player, newItemId, bytes(tokenURI));
        tokenSalePrice[newItemId] = _salePrice;
        tokenCreator[newItemId] = tokenCreatorAdd;

        return newItemId;
    }

    function buy(uint256 _tokenId) public payable {
        uint256 salePrice = tokenSalePrice[_tokenId];
        uint256 sentPrice = msg.value;
        address payable tokenOwner = owner;
        address payable creator = payable(tokenCreator[_tokenId]);
        address buyer = msg.sender;
        require(salePrice > 0);
        require(sentPrice >= salePrice);
        payout(sentPrice, owner, creator, tokenOwner);
        _transfer(tokenOwner, buyer, _tokenId);
        tokenSalePrice[_tokenId] = 0;
    }

    function payout(uint256 _val, address payable _maintainer, address payable _creator, address payable _tokenOwner) private {
        uint256 maintainerPayment;
        uint256 creatorPayment;
        uint256 ownerPayment;

        maintainerPayment = _val.mul(maintainerPercentage).div(1000);
        creatorPayment = _val.mul(creatorPercentage).div(1000);
        ownerPayment = _val.sub(creatorPayment).sub(maintainerPayment);

        _maintainer.transfer(maintainerPayment);
        _creator.transfer(creatorPayment);
        _tokenOwner.transfer(ownerPayment);

    }

}