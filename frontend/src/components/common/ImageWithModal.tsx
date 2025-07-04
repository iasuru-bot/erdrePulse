import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Button from './Button';

interface ImageWithModalProps {
  src: string;
  alt: string;
  className?: string;
  buttonText?: string;
  buttonIcon?: React.ReactNode;
  useButton?: boolean;
}

const ImageWithModal: React.FC<ImageWithModalProps> = ({ 
  src, 
  alt, 
  className = '',
  buttonText = 'Voir la référence',
  buttonIcon,
  useButton = false
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col items-center">
      {useButton ? (
        // Mode bouton
        <Button
          variant="outlined"
          size="sm"
          onClick={() => setIsModalOpen(true)}
        >
          {buttonIcon}
          {buttonText}
        </Button>
      ) : (
        // Mode image
        <>
          <img
            src={src}
            alt={alt}
            className={`cursor-pointer transition-transform hover:scale-105 ${className}`}
            onClick={() => setIsModalOpen(true)}
          />
          <p className="text-xs text-gray-500 mt-1">Cliquez pour agrandir</p>
        </>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-auto h-full flex items-center justify-center p-1"
            onClick={e => e.stopPropagation()}
          >
            {/* Bouton de fermeture */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-1 right-1 sm:top-2 sm:right-2 text-white hover:text-gray-300 transition-colors z-10"
            >
              <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Image en grand */}
            <img
              src={src}
              alt={alt}
              className="max-w-[98vw] max-h-[98vh] w-auto h-auto object-contain rounded-lg shadow-xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageWithModal; 