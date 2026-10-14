import React from 'react';
import { motion } from 'framer-motion';

import {
  grainsImg,
  distillationImg,
  blendingImg,
  filtrationImg,
  bottlingImg,
} from '../../assets/process';

import './HorizontalCards.css';

export const PROCESS_STEPS = [
  {
    id: 'grains',
    stepNumber: '01',
    title: '01 - Grains',
    description: 'From carefully selected grains,<br/> the finest ingredients<br/> are chosen.',
    image: grainsImg,
  },
  {
    id: 'distillation',
    stepNumber: '02',
    title: '02 - Distillation',
    description: 'The spirit undergoes a precise distillation process to achieve the desired character and quality.',
    image: distillationImg,
  },
  {
    id: 'blending',
    stepNumber: '03',
    title: '03 - Blending',
    description: 'Carefully selected ingredients are blended to create a smooth and balanced flavour.',
    image: blendingImg,
  },
  {
    id: 'filtration',
    stepNumber: '04',
    title: '04 - Filtration',
    description: 'The spirit is thoroughly filtered to ensure clarity, smoothness, and consistent quality.',
    image: filtrationImg,
  },
  {
    id: 'bottling',
    stepNumber: '05',
    title: '05 - Bottling',
    description: 'The finished spirit is carefully bottled and sealed to preserve its quality and freshness.',
    image: bottlingImg,
  },
];

/**
 * HorizontalCards - Distillation Process Cards
 * Clean responsive display of all process steps without horizontal side scrolling.
 */
export default function HorizontalCards() {
  return (
    <section
      id="distillation"
      className="stack-cards-section"
      aria-label="Grand Master Distillation Process"
    >
      <div className="stack-cards-viewport">
        {/* Top Header above Cards */}
        <header className="stack-cards-top-header">
          <div className="stack-cards-header-left">
            <h2 className="stack-cards-top-title">Process</h2>
            <p className="stack-cards-top-desc">
              It is the perfect combination between quality distillate in an unique bottle shape and urban culture inspiration.
            </p>
          </div>
        </header>

        {/* Process Cards Track / Grid */}
        <div className="stack-cards-stage">
          <div className="horizontal-cards-track">
            {PROCESS_STEPS.map((step) => (
              <article
                key={step.id}
                className="stack-card"
                data-step={step.id}
              >
                {/* Archival Illustration Aperture */}
                <div className="stack-card__visual">
                  <motion.div
                    className="stack-card__img-wrap"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <img
                      src={step.image}
                      alt={step.title}
                      className="stack-card__img"
                      loading="lazy"
                    />
                  </motion.div>
                </div>

                {/* Card Editorial Content */}
                <div className="stack-card__content">
                  <h3 className="stack-card__title">{step.title}</h3>
                  <p
                    className="stack-card__desc"
                    dangerouslySetInnerHTML={{ __html: step.description }}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
