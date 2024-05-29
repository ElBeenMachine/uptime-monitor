import OnboardingData from "./OnboardingData";

interface Props {
    data: OnboardingData;
    handleChange: (event: any) => void;
}

export default function UsernamePassword({ data, handleChange }: Props) {
    return (
        <form className="w-full pt-6 px-8">
            <h1 className="text-3xl font-semibold mb-4">Account Information</h1>
            <div className="mb-5">
                <label className="block text-sm font-medium mb-2" htmlFor="name">
                    Username
                </label>
                <input
                    className="appearance-none block w-full bg-gray-200 text-[var(--foreground-alt)] border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    name="username"
                    type="text"
                    placeholder="Username"
                    value={data.username}
                    onChange={handleChange}
                    required
                    minLength={3}
                />
            </div>
            <div className="mb-5">
                <label className="block text-sm font-medium mb-2" htmlFor="name">
                    Username
                </label>
                <input
                    className="appearance-none block w-full bg-gray-200 text-[var(--foreground-alt)] border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={data.password}
                    onChange={handleChange}
                    required
                    minLength={8}
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-2" htmlFor="name">
                    Confirm Password
                </label>
                <input
                    className="appearance-none block w-full bg-gray-200 text-[var(--foreground-alt)] border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    name="password"
                    type="password"
                    placeholder="Confirm Password"
                    value={data.confirmPassword}
                    onChange={handleChange}
                    required
                    minLength={8}
                />
            </div>
        </form>
    );
}
