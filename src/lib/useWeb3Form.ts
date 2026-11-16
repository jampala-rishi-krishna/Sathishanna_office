import { useState } from 'react';

const ACCESS_KEY = '675b3c24-8999-426b-819b-29bc8e789cc7';

export type FormStatus = 'idle' | 'sending' | 'sent' | 'error';

/**
 * Sends a form to Web3Forms in the background so visitors stay on our site
 * and see our own confirmation instead of being redirected away.
 */
export function useWeb3Form(subject: string) {
  const [status, setStatus] = useState<FormStatus>('idle');

  async function submit(data: Record<string, string>) {
    // Honeypot: real people never tick the hidden "botcheck" box.
    if (data.botcheck) {
      setStatus('sent');
      return true;
    }
    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject,
          from_name: 'Hair 2 Hair Studio Website',
          ...data,
        }),
      });
      const json = await res.json();
      const ok = Boolean(json.success);
      setStatus(ok ? 'sent' : 'error');
      return ok;
    } catch {
      setStatus('error');
      return false;
    }
  }

  function fromForm(form: HTMLFormElement) {
    const data: Record<string, string> = {};
    new FormData(form).forEach((value, key) => {
      data[key] = String(value);
    });
    return data;
  }

  return { status, submit, fromForm, reset: () => setStatus('idle') };
}
