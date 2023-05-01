import { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';

type ChatMessage = {
  id: string;
  message: string;
  author: string;
  time: string;
};

const Chat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      message: 'Hola! ¿Cómo estás?',
      author: 'John Doe',
      time: '10:00 AM',
    },
    {
      id: '2',
      message: 'Muy bien, gracias por preguntar!',
      author: 'Jane Doe',
      time: '10:02 AM',
    },
  ]);

  const [currentMessage, setCurrentMessage] = useState('');

  const handleSendMessage = () => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      message: currentMessage,
      author: 'John Doe',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);
    setCurrentMessage('');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className='flex flex-col h-full'>
      <div className='bg-white rounded-t-xl flex-1'>
        <div className='flex justify-between items-center h-16 px-4 border-b border-gray-300'>
          <h2 className='text-lg font-medium text-gray-800'>Chat en vivo</h2>
          <button className='text-gray-600 focus:outline-none'>
            Abrir chat <FaChevronRight className='w-5 h-5' />
          </button>
        </div>
        <div className='px-4 py-2 h-96 overflow-y-scroll'>
          {messages.map((message) => (
            <div key={message.id} className='flex flex-col mb-4'>
              <div className='flex justify-between items-center mb-1'>
                <p className='text-gray-600 font-medium'>{message.author}</p>
                <p className='text-xs text-gray-400'>{message.time}</p>
              </div>
              <p className='text-gray-800'>{message.message}</p>
            </div>
          ))}
        </div>
        <div className='p-4 border-t border-gray-300'>
          <textarea
            className='w-full h-20 py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none'
            placeholder='Escriba aquí su mensaje...'
            value={currentMessage}
            onChange={(event) => setCurrentMessage(event.target.value)}
            onKeyDown={handleKeyDown}
          ></textarea>
          <button
            className='block w-full mt-2 py-2 px-3 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
            onClick={handleSendMessage}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
