import styles from "./SubmitButton.module.css";
export default function SubmitButton({ text}) {
  return (
    <button type="submit"  className={styles.submitButton}>
      {text}
    </button>
  );
}
