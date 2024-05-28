import OnboardingData from "./OnboardingData";

interface Props {
    data: OnboardingData;
    handleChange: (event: any) => void;
}

export default function UsernamePassword({ data, handleChange }: Props) {
    return (
        <form className="px-8 pt-6 pb-8 mb-4">
            <div className="mb-10">
                <label className="block text-sm font-bold mb-2" htmlFor="name">
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
            <div>
                <label className="block text-sm font-bold mb-2" htmlFor="email">
                    Email
                </label>
                <input
                    className="appearance-none block w-full bg-gray-200 text-[var(--foreground-alt)] border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={data.email}
                    onChange={handleChange}
                    required
                />
            </div>
        </form>
    );
}
