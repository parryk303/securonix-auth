import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import Forms from '../components/forms';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

export default function Secret() {
  const [session, loading] = useSession();
  const [content, setContent] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/raForms");
      const json = await res.json();
      if (json.success) {
        setContent(json.data);
      }
    };
    fetchData();
  }, [session]);

  if (typeof window !== "undefined" && loading) return null;

  if (!session) {
    return (
      <>
        <h1>Please Login first</h1>
      </>
    );
  }
  return (
      <>
      {content && (
        <Forms raForms={content} />
      )}
    </>
  );
}
