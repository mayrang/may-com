"use client";
import React from "react";
import styles from "./SignupModal.module.css";
import CloseButton from "./CloseButton";
import { signupAction } from "../_lib/signup";
import { useFormState, useFormStatus } from "react-dom";

function koreanMessage(message: string | undefined) {
  if (message === "no_id") {
    return "아이디는 필수 입력입니다.";
  }
  if (message === "no_name") {
    return "닉네임는 필수 입력입니다.";
  }
  if (message === "no_password") {
    return "비밀번호는 필수 입력입니다.";
  }
  if (message === "no_image") {
    return "프로필은 필수 입력입니다.";
  }
  if (message === "user_exist") {
    return "이미 존재하는 유저입니다.";
  }
  if (message === "response_error") {
    return "회원가입에 실패하였습니다.";
  }
  return "";
}

export default function SignupModal() {
  const [state, formAction] = useFormState(signupAction, { message: "" });
  const { pending } = useFormStatus();
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <CloseButton />
          <div>계정을 생성하세요.</div>
        </div>
        <form action={formAction}>
          <div className={styles.modalBody}>
            <div className={styles.inputDiv}>
              <label htmlFor="id" className={styles.inputLabel}>
                아이디
              </label>
              <input id="id" className={styles.input} required type="text" name="id" />
            </div>
            <div className={styles.inputDiv}>
              <label htmlFor="name" className={styles.inputLabel}>
                닉네임
              </label>
              <input id="name" className={styles.input} required type="text" name="name" />
            </div>
            <div className={styles.inputDiv}>
              <label htmlFor="password" className={styles.inputLabel}>
                비밀번호
              </label>
              <input id="password" className={styles.input} required type="password" name="password" />
            </div>
            <div className={styles.inputDiv}>
              <label htmlFor="image" className={styles.inputLabel}>
                프로필
              </label>
              <input id="image" className={styles.input} required type="file" name="image" />
            </div>
          </div>
          <div className={styles.modalFooter}>
            <button type="submit" className={styles.actionButton} disabled={pending}>
              가입하기
            </button>
            <div className={styles.error}>{koreanMessage(state?.message)}</div>
          </div>
        </form>
      </div>
    </div>
  );
}
