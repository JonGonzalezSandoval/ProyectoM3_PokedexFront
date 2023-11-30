export default function Profile() {
  function getUser() {}

  function handleUpdateUser() {}

  function handleDeleteUser() {}

  return (
    <main className="main-manage">
          <form onSubmit={handleUpdateUser}>
            <label htmlFor="">
              Actual name
              <input type="text" name="newName" placeholder="New Name"/>
            </label>
            <label htmlFor="">
              Change Password
              <input type="password" name="newPassword" placeholder="password"/>
            </label>
            <label htmlFor="">
              Verify Password
              <input type="password" name="verifyPassword" placeholder="repeat password"/>
            </label>
            <input type="submit" value="Update" />
          <button onClick={handleDeleteUser} className="deleteUser">Delete User</button>
          </form>
    </main>
  );
}
