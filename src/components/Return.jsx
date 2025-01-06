import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { ArrowLeft } from 'lucide-react';

export default function Return({ text, url, onClick }) {
  const navigate = useNavigate();

  return (
    <div className="w-full relative flex flex-row justify-center items-center my-4">
      <Button
        className="absolute left-0"
        variant="outline"
        size="icon"
        onClick={onClick ? onClick : () => navigate(url)}>
        <ArrowLeft />
      </Button>
      <h3 className="mb-0 text-center">{text}</h3>
    </div>
  );
}
