import React from "react";

interface AuthInputProps {
    type: string;
    placeholder: string;
    required?: boolean;
}

const AuthInput = React.forwardRef<HTMLInputElement, AuthInputProps>(({ type, placeholder, required }, ref) => {
    return <input ref={ref || null} className="border-solid border px-4 py-2 w-full mb-2 text-black" type={type} placeholder={placeholder} required={required} />;
});

export default AuthInput;
