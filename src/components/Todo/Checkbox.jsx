import { useState } from "react";

const CheckBox = () => {
  const [isChecked, setIsChecked] = useState(false);

  const checkHandler = (e) => {
    const checked = e.target.checked;
    setIsChecked(checked);
  };

  return (
    <label htmlFor="check" className="newtodo__label newtodo__label--footer">
      Recurring Todo
      <input
        className="newtodo__checkbox"
        type="checkbox"
        name="isChecked"
        id="check"
        onClick={checkHandler}
      />
      <span
        className="newtodo__checkmark"
        data-checked={`${isChecked ? "✓" : ""}`}
      >
        &nbsp;
      </span>
    </label>
  );
};

export default CheckBox;
