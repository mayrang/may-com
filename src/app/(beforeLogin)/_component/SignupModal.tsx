import React from "react";
import styles from "./SignupModal.module.css";
import CloseButton from "./CloseButton";
import { redirect } from "next/navigation";
export default function SignupModal() {
  const sumbitForm = async (formData: FormData) => {
    "use server";
    let shouldRedirect = false;
    if (!formData.get("id")) {
      return { message: "no_id" };
    }
    if (!formData.get("name")) {
      return { message: "no_name" };
    }
    if (!formData.get("password")) {
      return { message: "no_password" };
    }
    if (!formData.get("image")) {
      return { message: "no_image" };
    }
    console.log(formData);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`, {
        method: "post",
        body: formData,
        credentials: "include", // 이 속성이 있어야 쿠키 전달 가능
      });
      shouldRedirect = true;
    } catch (err) {
      console.error(err);
      shouldRedirect = false;
    }

    if (shouldRedirect) {
      redirect("/home");
    }
  };
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <CloseButton />
          <div>계정을 생성하세요.</div>
        </div>
        <form action={sumbitForm}>
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
            <button type="submit" className={styles.actionButton}>
              가입하기
            </button>
            <div className={styles.error}></div>
          </div>
        </form>
      </div>
    </div>
  );
}
