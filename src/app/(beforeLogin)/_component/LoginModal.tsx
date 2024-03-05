"use client";
import React, { ChangeEventHandler, FormEvent, useState } from "react";
import styles from "./LoginModal.module.css";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
export default function LoginModal() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const handleClose = () => {
    router.back();
  };

  const changeId: ChangeEventHandler<HTMLInputElement> = (e) => {
    setId(e.target.value);
  };

  const changePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  };

  const submitLoginForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id.trim()) {
      setMessage("아이디는 필수 입력입니다.");
      return null;
    }
    if (!password.trim()) {
      setMessage("비밀번호는 필수 입력입니다.");
    }
    try {
      const response = await signIn("credentials", {
        username: id,
        password: password,
        redirect: false,
      });
      console.log("response", response)
      if (!response || response.error) {
        console.error("response", response);
        setMessage("아이디 또는 비밀번호가 올바르지 않습니다.");
      }

      router.replace("/home");
    } catch (err) {
      console.error("error", err);
      setMessage("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <button onClick={handleClose} className={styles.closeButton}>
            <svg
              width={24}
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03"
            >
              <g>
                <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
              </g>
            </svg>
          </button>
          <div>로그인하세요.</div>
        </div>
        <form onSubmit={submitLoginForm}>
          <div className={styles.modalBody}>
            <div className={styles.inputDiv}>
              <label className={styles.inputLabel} htmlFor="id">
                아이디
              </label>
              <input className={styles.input} onChange={changeId} value={id} id="id" />
            </div>
            <div className={styles.inputDiv}>
              <label className={styles.inputLabel} htmlFor="password">
                비밀번호
              </label>
              <input
                className={styles.input}
                onChange={changePassword}
                value={password}
                id="password"
                type="password"
              />
            </div>
          </div>
          <div className={styles.message}>{message}</div>
          <div className={styles.modalFooter}>
            <button disabled={id === "" || password === ""} className={styles.actionButton} type="submit">
              로그인하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
