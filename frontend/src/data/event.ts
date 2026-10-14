import type { CampusEvent } from "../types/campus-event";

export const events: CampusEvent[] = [
  {
    id: "event-1",
    title: "Kariyer Günleri 2026",
    category: "Seminer",
    capacity: 150,
    date: "2026-11-10",
    time: "10:00",
    location: "Merkez Amfi",
    description: "Sektör liderleriyle buluşma ve kariyer fırsatları."
  },
  {
    id: "event-2",
    title: "React & TypeScript Atölyesi",
    category: "Atölye",
    capacity: 30,
    date: "2026-11-12",
    time: "14:00",
    location: "Lab 3",
    description: "Modern web geliştirme pratikleri."
  },
  {
    id: "event-3",
    title: "Yapay Zeka Söyleşisi",
    category: "Söyleşi",
    capacity: 80,
    date: "2026-11-15",
    time: "15:30",
    location: "Konferans Salonu B",
    description: "Geleceğin teknolojileri üzerine interaktif sohbet."
  },
  {
    id: "event-4",
    title: "Yazılım Hackathonu",
    category: "Yarışma",
    capacity: 50,
    date: "2026-11-20",
    time: "09:00",
    location: "Mühendislik Fakültesi",
    description: "24 saatlik kodlama maratonu."
  }
];