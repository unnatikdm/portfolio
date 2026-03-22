'use client';

import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Smile, Frown, Meh } from 'lucide-react';

const sentiments = [
  { emoji: '😊', label: 'Positive', color: '#00ff88' },
  { emoji: '😐', label: 'Neutral', color: '#06b6d4' },
  { emoji: '😞', label: 'Negative', color: '#ef4444' },
];

export function AIDemos() {
  const [sentiment, setSentiment] = useState<string | null>(null);
  const [textInput, setTextInput] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawings, setDrawings] = useState<number[][]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [recognizedDigit, setRecognizedDigit] = useState<string | null>(null);

  // Sentiment Analysis Mock
  const analyzeSentiment = (text: string) => {
    const positiveWords = ['good', 'great', 'amazing', 'love', 'awesome', 'excellent'];
    const negativeWords = ['bad', 'terrible', 'hate', 'awful', 'worst', 'horrible'];

    const lowerText = text.toLowerCase();
    const positiveCount = positiveWords.filter((word) => lowerText.includes(word)).length;
    const negativeCount = negativeWords.filter((word) => lowerText.includes(word)).length;

    if (positiveCount > negativeCount) {
      setSentiment('positive');
    } else if (negativeCount > positiveCount) {
      setSentiment('negative');
    } else {
      setSentiment('neutral');
    }
  };

  // Canvas Drawing
  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineTo(x, y);
    ctx.stroke();

    setDrawings((prev) => [...prev, [x, y]]);
  };

  const handleCanvasMouseUp = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }
    setDrawings([]);
    setRecognizedDigit(null);
  };

  const recognizeDrawing = () => {
    // Mock digit recognition
    const mockDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const randomDigit = mockDigits[Math.floor(Math.random() * mockDigits.length)];
    setRecognizedDigit(randomDigit);
  };

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-background via-card/20 to-background">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"
        >
          Interactive AI Demos
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Sentiment Analyzer */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-card/50 border border-primary/20 rounded-2xl p-8 backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold text-primary mb-6">Sentiment Analyzer</h3>

            <div className="space-y-4">
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Enter text to analyze sentiment..."
                className="w-full h-32 bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />

              <button
                onClick={() => analyzeSentiment(textInput)}
                className="w-full px-4 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all"
              >
                Analyze
              </button>

              {sentiment && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex flex-col items-center justify-center py-6 bg-card/80 rounded-lg border border-secondary/30"
                >
                  <div className="text-6xl mb-4">
                    {sentiment === 'positive' && '😊'}
                    {sentiment === 'neutral' && '😐'}
                    {sentiment === 'negative' && '😞'}
                  </div>
                  <p className="text-lg font-semibold text-secondary capitalize">{sentiment}</p>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Digit Recognizer */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-card/50 border border-secondary/20 rounded-2xl p-8 backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold text-secondary mb-6">Digit Recognizer</h3>

            <div className="space-y-4">
              <div className="bg-input border-2 border-secondary/30 rounded-lg overflow-hidden">
                <canvas
                  ref={canvasRef}
                  width={280}
                  height={280}
                  onMouseDown={handleCanvasMouseDown}
                  onMouseMove={handleCanvasMouseMove}
                  onMouseUp={handleCanvasMouseUp}
                  onMouseLeave={handleCanvasMouseUp}
                  className="w-full cursor-crosshair bg-gray-900"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={clearCanvas}
                  className="flex-1 px-4 py-2 bg-card border border-border hover:border-primary/50 text-foreground rounded-lg transition-colors"
                >
                  Clear
                </button>
                <button
                  onClick={recognizeDrawing}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-secondary to-accent text-secondary-foreground font-semibold rounded-lg hover:shadow-lg hover:shadow-secondary/50 transition-all"
                >
                  Recognize
                </button>
              </div>

              {recognizedDigit !== null && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex flex-col items-center justify-center py-6 bg-card/80 rounded-lg border border-secondary/30"
                >
                  <p className="text-sm text-muted-foreground mb-2">Recognized Digit</p>
                  <p className="text-6xl font-bold text-accent">{recognizedDigit}</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
