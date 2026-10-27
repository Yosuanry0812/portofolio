"use client";

import Image from "next/image";
import { Globe2, Laptop, Smartphone } from "lucide-react";
import type { Project } from "@/data/profile";
import { useI18n } from "@/lib/i18n";

export default function ProjectDevicePreview({
  project,
}: {
  project: Project;
}) {
  const { lang } = useI18n();
  const id = lang === "id";
  const mobile = project.kategori === "mobile";
  const hostname = project.demo
    ? new URL(project.demo).hostname
    : project.repo.split("/").at(-1);
  const screenshot = project.image ? (
    <Image
      src={project.image}
      alt={`${id ? "Tampilan asli" : "Actual interface of"} ${project.judul}`}
      fill
      sizes={
        mobile
          ? "(max-width: 600px) 160px, 220px"
          : "(max-width: 767px) 85vw, 550px"
      }
      className="project-screenshot"
    />
  ) : (
    <div className="preview-unavailable">{project.judul}</div>
  );

  return (
    <div
      className={`project-art real-project-preview device-preview ${mobile ? "mobile-device-preview" : "desktop-device-preview"}`}
      data-device={mobile ? "mobile" : "desktop"}
    >
      <div className="device-category">
        {mobile ? <Smartphone size={13} /> : <Laptop size={13} />}
        <span>{mobile ? "MOBILE APP" : "WEB APP"}</span>
      </div>
      <div className="device-stage">
        {mobile ? (
          <div className="phone-device">
            <span
              className="phone-side-key phone-volume-up"
              aria-hidden="true"
            />
            <span
              className="phone-side-key phone-volume-down"
              aria-hidden="true"
            />
            <span className="phone-side-key phone-power" aria-hidden="true" />
            <div className="phone-screen">
              {screenshot}
              <span className="phone-camera" aria-hidden="true">
                <i />
              </span>
              <span className="phone-home-indicator" aria-hidden="true" />
            </div>
          </div>
        ) : (
          <div className="desktop-device laptop-device">
            <div className="desktop-display">
              <span className="laptop-camera" aria-hidden="true" />
              <div className="device-browser-bar">
                <div className="browser-traffic-lights" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </div>
                <span className="device-address">
                  <Globe2 size={9} />
                  {hostname}
                </span>
                <i className="browser-menu-mark" aria-hidden="true" />
              </div>
              <div className="desktop-screen">{screenshot}</div>
              <div className="desktop-display-chin" aria-hidden="true">
                <span>MacBook Pro</span>
              </div>
            </div>
            <div className="laptop-hinge" aria-hidden="true" />
            <div className="laptop-base" aria-hidden="true">
              <div className="laptop-keyboard">
                {Array.from({ length: 36 }, (_, key) => <i key={key} />)}
              </div>
              <div className="laptop-trackpad" />
            </div>
            <div className="laptop-front-edge" aria-hidden="true"><span /></div>
          </div>
        )}
      </div>
      <div className="preview-source">
        <span>{project.previewPage || project.judul}</span>
        <span>{mobile ? "Mobile" : "Desktop"}</span>
      </div>
    </div>
  );
}
