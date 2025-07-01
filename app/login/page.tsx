'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './login.module.css';
import axios from 'axios';

export default function Login() {
  const [memberId, setMemberId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('http://localhost:8000/api/login', {
        memberId,
        password
      });
      const token = res.data.access_token;

      // トークンを localStorage に保存（今回は簡易的な手法）
      localStorage.setItem('token', token);

      router.push('/dashboard'); // 認証後ページへ遷移
    } catch (err: any) {
      setError(err.response?.data?.message || 'ログイン失敗');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>ログイン</h1>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="memberId">会員ID</label>
            <input
              id="memberId"
              type="memberId"
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
              required
              className={styles.input}
              placeholder="会員IDを入力"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">パスワード</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className={styles.button}
            disabled={loading}
          >
            {loading ? 'ログイン中...' : 'ログイン'}
          </button>
        </form>

        <div className={styles.links}>
          <Link href="/forgot-password" className={styles.link}>
            パスワードをお忘れですか？
          </Link>
          <Link href="/register" className={styles.link}>
            アカウント登録
          </Link>
        </div>
      </div>
    </div>
  );
}
