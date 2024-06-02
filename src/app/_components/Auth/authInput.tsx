/**
 * @author - @ElBeenMachine
 */

import React from "react";

interface AuthInputProps {
    type: string;
    placeholder: string;
    name: string;
    required?: boolean;
}

const AuthInput = React.forwardRef<HTMLInputElement, AuthInputProps>(({ type, placeholder, required, name }, ref) => {
    return (
        <input
            ref={ref || null}
            className="border-solid border rounded-md px-4 py-2 w-full mb-2 text-black"
            type={type}
            placeholder={placeholder}
            name={name}
            required={required}
            autoComplete="off"
        />
    );
});

export default AuthInput;
