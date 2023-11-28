export default function Profile(){

    function getUser() {
        
    }

    function handleUpdateUser() {
        
    }

    function handleDeleteUser(){

    }


    return(
        <div>
            <article>
                <section>
                    <form onSubmit={handleUpdateUser}>
                        <label htmlFor="">Change Name<input type="text" name="newName" /></label>
                        <label htmlFor="">Change Password<input type="password" name="newPassword" /></label>
                        <label htmlFor="">Verify Password<input type="password" name="verifyPassword" /></label>
                        <input type="submit" value="Update" />
                    </form>
                    <button onClick={handleDeleteUser}>Delete</button>
                </section>
            </article>
        </div>
    )

}