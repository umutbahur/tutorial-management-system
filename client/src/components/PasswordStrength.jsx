import { useEffect, useState } from "react";
import api from "../services/api";

const PasswordStrength = ({ password }) => {
  const [policy, setPolicy] = useState(null);

  useEffect(() => {
    api.get("/password-policy")
      .then(res => setPolicy(res.data))
      .catch(() => console.error("Failed to load password policy"));
  }, []);

  if (!policy) return null;

  const { minLength, minLowercase, minUppercase, minNumbers, minSymbols } = policy;

  const checks = {
    minLength: password.length >= minLength,
    lowercase: (password.match(/[a-z]/g) || []).length >= minLowercase,
    uppercase: (password.match(/[A-Z]/g) || []).length >= minUppercase,
    number: (password.match(/[0-9]/g) || []).length >= minNumbers,
    symbol: (password.match(/[^A-Za-z0-9]/g) || []).length >= minSymbols,
  };

  const passedCount = Object.values(checks).filter(Boolean).length;
  const strength = (passedCount / Object.keys(checks).length) * 100;

  const getColor = (strength) => {
    if (strength <= 40) return "bg-red-500";
    if (strength <= 80) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="mt-2 text-sm">
      <div className="w-full h-2 bg-gray-300 rounded mb-1">
        <div
          className={`h-2 rounded ${getColor(strength)}`}
          style={{ width: `${strength}%` }}
        ></div>
      </div>
      {Object.entries(checks).map(([key, passed]) => (
        !passed && (
          <p key={key} className="text-red-500 flex items-center gap-1">
            <span>⚠️</span> {key === "minLength" ? `≥ ${minLength} characters`
              : key === "lowercase" ? `≥ ${minLowercase} lowercase letter`
              : key === "uppercase" ? `≥ ${minUppercase} uppercase letter`
              : key === "number" ? `≥ ${minNumbers} number`
              : `≥ ${minSymbols} symbol`}
          </p>
        )
      ))}
    </div>
  );
};

export default PasswordStrength;
