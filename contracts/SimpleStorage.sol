pragma solidity ^0.4.24 ;

contract SimpleStorage {
	
	
	struct DocStruct {
    address index;
  	uint status;
    address[] upvote;
    address[] downvote;
  }
  
  mapping(string => DocStruct) private docStructs;
  string[] public hashes;

  event AddNewFile(string hash, address userAddress, uint status);
 

  function insertDoc(address userAddress, string hash) public 
  {
    require(!isDocPresent(hash));
    AddNewFile(hash, userAddress, 1);
    hashes.push(hash);
    docStructs[hash].index = userAddress;
    docStructs[hash].status = 1;
  }

  function isDocPresent(string hashval) view returns(bool)
  {
    return (docStructs[hashval].index != 0x0);
  }

  function isOwner(address userAddress, string h) constant returns(bool b)
  {
    if (docStructs[h].index == userAddress) 
    {
      return true;
    }
    return false;
  }  

  function displayHash(uint num) constant returns(string hash)
  {
    return hashes[num];
  }

  function displayDocStatus(string hash) constant returns(uint status)
  {
    return docStructs[hash].status;
  }

  function displayDocCount() constant returns(uint count)
  {
    return hashes.length;
  }
	
  function upVote(string dochash, address CAaddr)
  public
  {
    require(!isAudited(dochash) && !isVoted(dochash, CAaddr));
    docStructs[dochash].upvote.push(CAaddr);
    
    if(isAudited(dochash))
      {
        if(getUpvoteCount(dochash) > getDownvoteCount(dochash))
          {
            docStructs[dochash].status = 0;
          }
        else
          {
            docStructs[dochash].status = 2;
          }
      }
  }
  
  function downVote(string dochash, address CAaddr)
  public
  {
    require(!isAudited(dochash) && !isVoted(dochash, CAaddr));
    docStructs[dochash].downvote.push(CAaddr);
    if(isAudited(dochash))
      {
        if(getUpvoteCount(dochash) > getDownvoteCount(dochash))
          {
            docStructs[dochash].status = 0;
          }
        else
          {
            docStructs[dochash].status = 2;
          }
      }
  }
  
  function isVoted(string dochash, address addr)
  view returns(bool)
  {
    for(uint i=0;i<docStructs[dochash].upvote.length;i++)
      {
        if(docStructs[dochash].upvote[i] == addr)
          {
            return true;
          }
      }
    for(i=0;i<docStructs[dochash].downvote.length;i++)
      {
        if(docStructs[dochash].downvote[i] == addr)
          {
            return true;
          }
      }
    return false;
  }
  
  function isAudited(string dochash)
  view returns (bool)
  {
    return ((docStructs[dochash].upvote.length + docStructs[dochash].downvote.length) >= 5);
  }
  
  function getUpvoteCount(string dochash)
  view returns(uint)
  {
    return (docStructs[dochash].upvote.length);
  }
  
  function getDownvoteCount(string dochash)
  view returns(uint)
  {
    return (docStructs[dochash].downvote.length);
  }
  
  function compareStrings (string a, string b) 
  view returns (bool)
  {
       return keccak256(a) == keccak256(b);
   }

}

