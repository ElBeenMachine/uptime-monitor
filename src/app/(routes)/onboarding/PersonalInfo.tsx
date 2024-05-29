import OnboardingData from "./OnboardingData";

interface Props {
    data: OnboardingData;
    handleChange: (event: any) => void;
}

export default function PersonalInfo({ data, handleChange }: Props) {
    return (
        <form className="w-full pt-6 px-8">
            <h1 className="text-3xl font-semibold mb-4">Personal Information</h1>
            <div className="mb-5">
                <label className="block text-sm font-medium mb-2" htmlFor="name">
                    First Name
                </label>
                <input
                    className="appearance-none block w-full bg-gray-200 text-[var(--foreground-alt)] border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    name="firstName"
                    type="text"
                    placeholder="John"
                    value={data.firstName}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-5">
                <label className="block text-sm font-medium mb-2" htmlFor="email">
                    Last Name
                </label>
                <input
                    className="appearance-none block w-full bg-gray-200 text-[var(--foreground-alt)] border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    name="lastName"
                    type="text"
                    placeholder="Doe"
                    value={data.lastName}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-2" htmlFor="email">
                    Email Address
                </label>
                <input
                    className="appearance-none block w-full bg-gray-200 text-[var(--foreground-alt)] border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    name="email"
                    type="email"
                    placeholder="admin@example.com"
                    value={data.email}
                    onChange={handleChange}
                    required
                />
            </div>
        </form>
    );
}
