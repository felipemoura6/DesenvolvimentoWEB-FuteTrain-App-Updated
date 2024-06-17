import { useState, useEffect } from 'react';
import { getItemsFromUser } from '../api';
import { UserInventoryResponse } from './types'; // Importe a interface UserInventoryResponse
import { Item } from './types';
import noItems from '../assets/images/web-spider.png';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

export function ContentInventory() {
  const [inventory, setInventory] = useState<UserInventoryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imagesLoading, setImagesLoading] = useState(true);
  const [searchItems, setSearchItems] = useState<string>('');

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await getItemsFromUser(token);
          setInventory(response);
        } else {
          setError('Token not found');
        }
      } catch (error) {
        setError('Error fetching inventory');
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  useEffect(() => {
    if (inventory) {
      const imagePromises = inventory.items.map(item => {
        if (item.item_icon) {
          return new Promise<void>((resolve) => {
            const img = new Image();
            img.src = item.item_icon;
            img.onload = () => resolve();
            img.onerror = () => resolve(); //
          });
        }
        return Promise.resolve();
      });

      Promise.all(imagePromises).then(() => {
        setImagesLoading(false);
      });
    }
  }, [inventory]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!inventory) {
    return null;
  }

  const handleSearch = (text: string)=>{
    setSearchItems(text)
  }

  return (
    <div
      className={`bg-gradient-to-t from-slate-950 to-slate-900 w-full h-full fixed flex-grow overflow-y-auto pb-[10rem] ${imagesLoading ? 'cursor-wait' : ''}`}
    >
      <div className="h-px bg-gray-200 mb-1"></div>
      <div className="sm:p-4 p-1">
        <div className='grid grid-flow-col grid-cols-2'>
          <h2 className="left-auto right-auto justify-center flex mb-2 text-slate-300 font-bold text-lg items-center">{inventory.nome_user} inventory!</h2>
          <div className="relative w-full max-w-md">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              className="bg-slate-700/50 w-full pl-10 pr-4 py-2 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent text-slate-400"
              placeholder="Search items in your inventory"
              value={searchItems}
              onChange={(e)=> handleSearch(e.target.value)}
            />
          </div>
        </div>
        
        <div className='m-4 bg-slate-950 sm:p-8 p-3 border border-slate-700 h-screen'>
          {inventory.items.length === 1 && inventory.items[0].item_id === 0 ? (
            <div className="flex justify-center items-center flex-col h-full">
              <img src={noItems} alt="" className='size-64 mt-[10rem] mx-auto block'/>
              <p className="text-slate-300 mt-2">No items found in this inventory</p>
            </div>
          ) : (
            <div className="grid grid-flow-row sm:grid-cols-6 gap-3 grid-cols-2">
              {inventory.items
                .filter(item => item.item_id !== 0 && (!searchItems || item.item_name.toLowerCase().includes(searchItems.toLowerCase())))
                .map((item: Item) => (
                  <div key={item.item_name} className="grid grid-flow-row gap-0 sm:text-[16px] text-[14px] items-center sm:p-4 p-2 bg-slate-800 border border-slate-200 rounded-md hover:bg-slate-800/80 hover:cursor-pointer">
                    <img src={item.item_icon} alt={item.item_name} className="sm:w-20 sm:h-20 w-14 h-14 mx-auto block mb-2" />
                    <div className="flex items-center">
                      <p className='text-slate-500 mr-1 text-sm'>Item:</p>
                      <p className='text-slate-300 text-sm'>{item.item_name}</p>
                    </div>
                    <div className="flex items-center">
                      <p className='text-slate-500 mr-1 text-sm'>Quantidade:</p>
                      <p className='text-slate-300'>{item.quantity}</p>
                    </div>
                  </div>
                ))}

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
