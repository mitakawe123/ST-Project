import React, { useState } from 'react';
import { getUser } from "@/utils/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import FoodCard from '@/components/profile/FoodCard';
import FluidCard from '@/components/profile/FluidCard';
import SleepCard from '@/components/profile/SleepCard';
import WorkoutList from '@/components/profile/Workouts/WorkoutList';
import MyPosts from '@/components/post/post-lists/MyPosts';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { RootState } from "@/app/store";

import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import PersonList from '@/components/post/post-lists/PersonList';



const ProfilePage: React.FC = () => {
  const user = getUser();
  const [searchParams] = useSearchParams();
  const emailQuery = searchParams.get("email");
  const isMine = emailQuery === user.Email;

  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  });

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
    }
  };
  const foodEntries = useSelector((state: RootState) => state.profileSlice.foodEntries);


  return (
    <div className="container mx-auto p-4">
      {isMine ? <h1 className="text-3xl font-bold mb-6">Welcome, {user.Email}</h1> : <h1 className="text-3xl font-bold mb-6">{emailQuery}'s profile</h1>}
      <div className="mb-4">
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Select Date:
        </label>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <h2 className="text-2xl font-bold mb-6">Your stats for {selectedDate.toDateString()}</h2>

      <div className="grid gap-4 lg:grid-cols-3 mb-8">
        <FoodCard selectedDate={selectedDate} email={emailQuery || ''} />
        <FluidCard selectedDate={selectedDate} email={emailQuery || ''} />
        <SleepCard selectedDate={selectedDate} email={emailQuery || ''} />
      </div>
      <Tabs defaultValue="my-posts">
        <TabsList className="mb-4">
          <TabsTrigger value="my-posts">{isMine ? "My Posts" : `Posts`}</TabsTrigger>
          <TabsTrigger value="workouts">Workouts</TabsTrigger>
          <TabsTrigger value="food">Food Consumed</TabsTrigger>
        </TabsList>
        <TabsContent value="my-posts">
          {isMine ? <MyPosts /> : emailQuery && <PersonList email={emailQuery} />}
        </TabsContent>
        <TabsContent value="workouts">
          <WorkoutList selectedDate={selectedDate} email={emailQuery || ''} isMine={isMine} />
        </TabsContent>
        <TabsContent value="food">
          <h2 className="text-2xl font-bold mb-4">Food Log History</h2>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>{selectedDate.toDateString()}</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <ul className="space-y-2">
                  {foodEntries.map((food, index) => (
                    <li
                      key={index}
                      className="flex items-center space-x-4 p-2 hover:bg-gray-100 rounded"
                    >
                      <img
                        src={food.photo.thumb}
                        alt={food.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-grow">
                        <h4 className="font-medium">{food.name}</h4>
                        <p className="text-sm text-gray-600">
                          {food.servingQty} serving (
                          {food.servingWeightGrams}g)
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {food.calories.toFixed(1)} cal
                        </p>
                        <p className="text-sm text-gray-600">
                          P: {food.protein.toFixed(1)}g | C:{" "}
                          {food.calories.toFixed(1)}g | F:{" "}
                          {food.totalFat.toFixed(1)}g
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;
