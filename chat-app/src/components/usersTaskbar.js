import enterIcon from "../icons/arrow-return-left.svg";

export default function UsersTaskBar({
  setCurrentExchangeTo,
  messageThreadsObj,
  currentExchangeTo,
  width,
}) {
  var exchanges = Object.keys(messageThreadsObj);
  if (!currentExchangeTo && width > 900) {
    setCurrentExchangeTo(exchanges[0]);
  }
  var usersGraphical = exchanges.map((user) => {
    var isActive = user === currentExchangeTo ? " active " : "";
    return (
      <li
        id={user}
        className={"list-group-item" + isActive}
        onClick={(e) => {
          if (currentExchangeTo) {
            document
              .getElementById(currentExchangeTo)
              .classList.remove("active");
          }
          e.currentTarget.classList.add("active");
          setCurrentExchangeTo(user);
        }}
      >
        <div className="">{user}</div>
      </li>
    );
  });
  var handleAddUser = (e) => {
    e.preventDefault();
    var user = document.getElementById("username-search-box").value;
    document.getElementById("chat_box").select();
    setCurrentExchangeTo(user);
  };

  return (
    <div className="task-bar col-md-3">
      <form className="row container-fluid w-100" style={{justifyContent:'center'}}>
        <input
          type="text"
          className=" mb-4 input-style username-search-input col-8"
          id="username-search-box"
          placeholder="username"
        />
        <button
          type="submit"
          class="col-3 btn btn-light enter-button"
          onClick={handleAddUser}
        >
          <img src={enterIcon} />
        </button>
      </form>
      {exchanges.length === 0 && width < 950 && (
        <div className="text-center">
          <h4>Enter Username and Text Someone!</h4>
          <div>
            <button
              className="btn btn-primary"
              onClick={() => {
                document.getElementById("username-search-box").select();
              }}
            >
              New Message
            </button>
          </div>
        </div>
      )}
      <ul class="list-group">{usersGraphical}</ul>
    </div>
  );
}
