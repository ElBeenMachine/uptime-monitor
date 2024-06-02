import { useState } from "react";
import OnboardingData from "./OnboardingData";

interface Props {
    data: OnboardingData;
    errors: { [key: string]: string };
    handleChange: (event: any) => void;
}

export default function UsernamePassword({ data, errors, handleChange }: Props) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
                    autoComplete="off"
                    required
                />
                {errors.username && <div className="text-red-500 mt-1">{errors.username}</div>}
            </div>
            <div className="mb-5">
                <label className="block text-sm font-medium mb-2" htmlFor="name">
                    Password
                </label>
                <input
                    className="appearance-none block w-full bg-gray-200 text-[var(--foreground-alt)] border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={data.password}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                />
                <div className="flex items-center mt-2">
                    <input type="checkbox" className="appearance-none mr-2 rounded-full" onChange={() => setShowPassword(!showPassword)} />
                    <label className="mr-2">Show Password</label>
                </div>
                {errors.password && <div className="text-red-500 mt-1">{errors.password}</div>}
            </div>
            <div>
                <label className="block text-sm font-medium mb-2" htmlFor="name">
                    Confirm Password
                </label>
                <input
                    className="appearance-none block w-full bg-gray-200 text-[var(--foreground-alt)] border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    value={data.confirmPassword}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                />

                {errors.confirmPassword && <div className="text-red-500 mt-1">{errors.confirmPassword}</div>}
            </div>
        </form>
    );
}
