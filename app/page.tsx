"use client";

import './globals.css';
import React, { useState } from 'react';

//defining the properties of the object Item
type ItemData = {
  name: string;
  cost: number;
  index: number;
  isRemoving?: boolean;
};

//defining the properties of the object ItemCard
type ItemCardProps = ItemData & {
  onRemove: (index: number) => void;
};

//function component ItemCard, returns the card with name and cost
const ItemCard = ({ name, cost, index, isRemoving = false, onRemove }: ItemCardProps) => {
  return (
    <div
      className={`relative p-4 pr-20 m-2 border-4 border-[var(--bluegreen)] font-bold text-3xl ${isRemoving ? 'fadeOut' : 'fadeIn'}`}
    >
      <p>Name: {name}</p>
      <p>Cost: {cost}$</p>
      <button
        type="button"
        onClick={() => onRemove(index)}
        className="text-red-700 font-bold absolute top-2 right-2"
      >
        X
      </button>
    </div>
  );
};


const Home = () => {
  const [itemName, setItemName] = useState("");
  const [itemCost, setItemCost] = useState("");
  const [index, setIndex] = useState(0);
  const [sum, setSum] = useState(0);
  const [items, setItems] = useState<ItemData[]>([]);

  //function to add items 
  const handleAddItem = () => {
    if (itemName.trim() === "" || itemCost.trim() === "") return; //does not except emty inputs

    const newCost = parseFloat(itemCost);

    //updating the state using the previous items value
    setItems((prevItems) => {
      //creates a new item object, returns a new array with precious data plus the new data
      const newItem = {
        name: itemName.trim(),
        cost: newCost,
        index: prevItems.length + 1,
        isRemoving: false,
      };
      return [...prevItems, newItem];
    });

    //updates sum and index
    setSum(sum + newCost);
    setIndex(index + 1);
    //empties the index boxes
    setItemName("");
    setItemCost("");
  };

  //function that removes indexToRemove
  const handleRemoveItem = (indexToRemove: number) => {
    // Mark the item as "removing"mby looping through every item, finds index and sets isRemoving to true
    setItems((prevItems) =>
      //loops through every item
      prevItems.map((item) =>
        item.index === indexToRemove ? { ...item, isRemoving: true } : item
      )
    );

    // Wait for fadeOut animation to finish (e.g. 500ms), then actually remove
    setTimeout(() => {
      setItems((prevItems) =>
        //filter is a method that creates a new array by checking each element in the original array (prevItems), and keeping only those that meet a condition.
        prevItems.filter((item) => item.index !== indexToRemove)
      );
      //removed is the item to be removed
      const removed = items.find((item) => item.index === indexToRemove);
      if (removed) {
        //updates the sum if an item is removed
        setSum((prevSum) => prevSum - removed.cost);
      }
    }, 500); // duration matches fadeOut
  };


  return (
    <div className="min-h-screen flex">
      <div className='w-2/3 px-8 '>
        <p className='text-[var(--bluegreen)] text-6xl font-medium  pt-16 ' >Add expense</p>
        <div className="px-6">
          <div className="flex items-center py-8 ">
            <label htmlFor="name" className="text-4xl font-medium text-white w-40 ">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}  //triggers every time the value in the input field changes
              placeholder=""
              className="bg-white text-black text-2xl border border-gray-300 rounded-xs px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-[var(--bluegreen)]"
            />
          </div>
          <div className="flex items-center ">
            <label htmlFor="name" className="text-4xl font-medium text-white w-40 ">
              Cost
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={itemCost}
              onChange={(e) => setItemCost(e.target.value)}
              placeholder=""
              className="bg-white text-black border text-2xl border-gray-300 rounded-xs px-4 py-2 w-[400px] focus:outline-none focus:ring-2 focus:ring-[var(--bluegreen)]"
            />
          </div>
          <button
            type="button"
            onClick={handleAddItem} className='bg-gray-200 text-black text-5xl my-8 p-2 rounded-sm'>
            Add
          </button>
        </div>
        <p className='text-[var(--bluegreen)]  text-6xl font-medium  py-16' >Stats</p>
        <div className="px-6">

          <p className='text-white  text-4xl font-medium' >Sum: {sum}</p>
          <p className='text-white  text-4xl font-medium' >Count: {index}</p>
        </div>
      </div>

      {/* second column */}
      <div>
        {/* renders a list of components. loops over each item in the array and returns an <ItemCard /> component for each one. */}
        {items.map((item) => (
          <ItemCard
            key={item.index}
            name={item.name}
            cost={item.cost}
            index={item.index}
            isRemoving={item.isRemoving}
            onRemove={handleRemoveItem}
          />
        ))}
      </div>

    </div >
  );
};

export default Home;
