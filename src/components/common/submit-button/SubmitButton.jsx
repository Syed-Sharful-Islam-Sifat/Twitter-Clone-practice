import styles from "./SubmitButton.module.css";
export default function SubmitButton({ text, onSubmit}) {
  return (
    <button type="submit"  className={styles.submitButton} onClick={onSubmit}>
      {text}
    </button>
  );
}
