export default function WelcomePage() {
    return (
        <div className="px-8 pt-6">
            <h1 className="text-3xl font-semibold mb-8">Welcome 👋</h1>

            <p className="mb-5 font-light text-md text-justify">
                To continue, please create an administrator account. This account will give you full access to all features and settings of the app.
            </p>

            <p className="font-light text-md text-justify">
                As the owner, your administrator account will allow you to manage every aspect of the application, including the creation and
                management of additional user accounts. This initial setup is essential for controlling and customizing your app experience.
            </p>
        </div>
    );
}
