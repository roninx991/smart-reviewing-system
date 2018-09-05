pragma solidity^0.4.19;

contract User {

  struct UserStruct {
	string category;
    uint index;
  }
  
  mapping(address => UserStruct) private userStructs;
  address[] private userIndex;

  event LogNewUser   (address indexed userAddress, uint index, string category);
  event LogUpdateUser(address indexed userAddress, uint index, string category);
  
  function isUser(address userAddress)
    public view
    returns(bool isIndeed) 
  {
    if(userIndex.length == 0) return false;
    return (userIndex[userStructs[userAddress].index] == userAddress);
  }

  function insertUser(address userAddress, string category) 
    public
    returns(uint index)
  {
    if(isUser(userAddress)) throw; 
	userStructs[userAddress].category = category;
    userStructs[userAddress].index     = userIndex.push(userAddress)-1;
    LogNewUser(userAddress, userStructs[userAddress].index, userStructs[userAddress].category);
    return userIndex.length-1;
  }
  
  function getUser(address userAddress)
    public view
    returns(string category, uint index)
  {
    if(!isUser(userAddress)) throw; 
    return(
      userStructs[userAddress].category, 
      userStructs[userAddress].index);
  } 
  function getUserCategory(address userAddress)
  	public view returns(string category)
  {
    if(!isUser(userAddress)) throw; 
    return userStructs[userAddress].category;
  }

  function updateUsercategory(address userAddress, string category) 
    public
    returns(bool success) 
  {
    if(!isUser(userAddress)) throw; 
    userStructs[userAddress].category = category;
    LogUpdateUser(userAddress, userStructs[userAddress].index, userStructs[userAddress].category);
    return true;
  }
  
  function getUserCount() 
    public view
    returns(uint count)
  {
    return userIndex.length;
  }

  function getUserAtIndex(uint index)
    public view 
    returns(address userAddress)
  {
    return userIndex[index];
  }

}
