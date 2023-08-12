export default async function signOutUser(token: string) {
    try {
        const val = await fetch("http://localhost:8000/sign_out", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({token}),
            cache: "no-cache"
        }).then(
            (res) => {
                console.log(res);
                if (res.ok) {
                    return res.json();
                }
            }
        ).catch(err => { return { error: err.message }; });
        return val;
    }
    catch (err) {
        return { error: "Server error" };
    }
}