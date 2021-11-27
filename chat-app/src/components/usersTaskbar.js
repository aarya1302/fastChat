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
    setCurrentExchangeTo(user);
  };

  return (
    <div className="task-bar col-md-3">
      <form className="row container-fluid">
        <input
          type="text"
          className=" mb-4 input-style username-search-input col-9"
          id="username-search-box"
          placeholder="username"
        />
        <button
          type="submit"
          class="col-3 btn btn-light enter-button"
          onClick={handleAddUser}
        >
          <img src={enterIcon} />{" "}
        </button>
      </form>
      <ul class="list-group">{usersGraphical}</ul>
    </div>
  );
}
