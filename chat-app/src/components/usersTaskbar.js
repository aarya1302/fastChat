export default function UsersTaskBar({
  setCurrentExchangeTo,
  messageThreadsObj,
}) {
  var exchanges = Object.keys(messageThreadsObj);
  console.log(exchanges);
  var usersGraphical = exchanges.map((user) => {
    return (
      <li
        onClick={() => {
          console.log(user, "setting to user");
          setCurrentExchangeTo(user);
        }}
      >
        <div>{user}</div>
      </li>
    );
  });
  var handleAddUser = (e) => {
    e.preventDefault();
    var user = document.getElementById("username-search-box").value;
    setCurrentExchangeTo(user);
  };

  return (
    <div className="task-bar col-sm-3">
      <form>
        <input
          type="text"
          className=" mb-4 input-style"
          id="username-search-box"
          placeholder="username"
        />
        <input type="submit" onClick={handleAddUser} />
      </form>
      <ul>{usersGraphical}</ul>
    </div>
  );
}
