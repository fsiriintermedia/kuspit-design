import * as React from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

interface OTPCodeFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  maxLength?: number;
}

export const OTPCodeField: React.FC<OTPCodeFieldProps> = ({
  value,
  onChange,
  error = false,
  maxLength = 6,
}) => {
  return (
    <InputOTP
      maxLength={maxLength}
      value={value}
      onChange={onChange}
      pattern={REGEXP_ONLY_DIGITS}
    >
      <InputOTPGroup>
        {Array.from({ length: maxLength }).map((_, i) => (
          <InputOTPSlot
            key={`otp-${i}`}
            index={i}
            className={error ? "border-destructive text-destructive" : ""}
          />
        ))}
      </InputOTPGroup>
    </InputOTP>
  );
};
