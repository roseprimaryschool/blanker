/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Shield, Zap, Globe, AlertTriangle, ArrowRight } from 'lucide-react';

export default function App() {
  const [url, setUrl] = useState('');

  const handleBlank = (e?: FormEvent) => {
    e?.preventDefault();
    if (!url) return;

    let targetUrl = url.trim();
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
      targetUrl = `https://${targetUrl}`;
    }

    try {
      const win = window.open('about:blank', '_blank');
      if (!win) {
        alert('Pop-up blocked! Please allow pop-ups for this site to use the blanker.');
        return;
      }

      win.document.title = 'about:blank';
      win.document.body.style.margin = '0';
      win.document.body.style.height = '100vh';
      win.document.body.style.overflow = 'hidden';

      const iframe = win.document.createElement('iframe');
      iframe.style.border = 'none';
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.margin = '0';
      iframe.referrerPolicy = 'no-referrer';
      iframe.src = targetUrl;

      win.document.body.appendChild(iframe);
    } catch (error) {
      console.error('Failed to open blank page:', error);
    }
  };

  return (
    <div className="h-screen w-screen bg-bg text-ink font-sans grid grid-cols-[80px_1fr_1fr] grid-rows-[1fr_auto] overflow-hidden">
      {/* Left Rail Navigation */}
      <aside className="row-span-2 border-r border-white/10 flex flex-col items-center py-10">
        <div className="w-6 h-6 bg-accent rounded-sm mb-auto" />
        <div className="writing-vertical rotate-180 uppercase tracking-[0.2em] text-[10px] font-bold text-muted mt-auto">
          Institutional Access Bypass // v4.0.1
        </div>
      </aside>

      {/* Hero Content */}
      <main className="col-span-2 px-10 md:px-20 lg:px-40 flex flex-col justify-center relative">
        {/* Abstract Dot Accent */}
        <div className="absolute top-10 right-10 w-32 h-32 border border-muted rounded-full flex items-center justify-center">
          <span className="text-[10px] text-muted uppercase tracking-widest">Secure Piped</span>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="text-[11px] uppercase tracking-[0.15em] text-accent font-extrabold mb-6">
            Detached Instance Manager
          </div>
          <h1 className="text-[12vw] md:text-[112px] leading-[0.85] font-black uppercase tracking-[-0.04em] mb-10">
            Invisible<br />Gateway.
          </h1>
          
          <form onSubmit={handleBlank} className="relative max-w-3xl group">
            <Input
              type="text"
              placeholder="https://enter-destination-url.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full bg-transparent border-none border-b-4 border-ink rounded-none p-0 py-6 text-2xl md:text-4xl font-light focus-visible:ring-0 placeholder:text-white/15 transition-all"
            />
            <Button 
              type="submit"
              className="absolute right-0 bottom-6 bg-accent hover:bg-accent/90 text-white rounded-none px-8 py-6 h-auto font-black uppercase tracking-widest text-xs transition-transform active:scale-95"
            >
              Launch
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </form>

          <div className="mt-12 max-w-md leading-relaxed text-muted text-sm">
            By entering a URL above, a new window is generated using a data-uri injection method, 
            making the session appear as 'about:blank' to network monitors and filters.
          </div>

          <div className="mt-8 flex items-start gap-3 bg-white/5 border border-white/10 p-4 max-w-md">
            <AlertTriangle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
            <p className="text-[10px] text-muted leading-relaxed uppercase tracking-wider">
              Note: Some domains (Google, YouTube) enforce strict frame policies and may not load in detached mode.
            </p>
          </div>
        </motion.div>
      </main>

      {/* Footer / Status Area */}
      <footer className="col-span-2 grid grid-cols-1 md:grid-cols-3 border-t border-white/10 bg-[#111111]">
        <div className="p-10 border-r border-white/10">
          <h4 className="text-[10px] uppercase tracking-widest text-muted mb-2">System Status</h4>
          <p className="text-sm font-medium">Ready for Injection</p>
        </div>
        <div className="p-10 border-r border-white/10">
          <h4 className="text-[10px] uppercase tracking-widest text-muted mb-2">Active Cloaks</h4>
          <p className="text-sm font-medium">14,282 Active Tunnels</p>
        </div>
        <div className="p-10">
          <h4 className="text-[10px] uppercase tracking-widest text-muted mb-2">Latency</h4>
          <p className="text-sm font-medium">0.04ms Local Payload</p>
        </div>
      </footer>
    </div>
  );
}
