'use client';
import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation';
import { useFirestore } from '@/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function HotelEditor(){
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const firestore = useFirestore();
  const storage = getStorage();

  const { register, control, handleSubmit, reset } = useForm({ defaultValues: { roomCategories: [] } });
  const { fields, append, remove } = useFieldArray({ control, name: 'roomCategories' });

  useEffect(()=>{
    if(!id || !firestore) return;
    (async ()=>{
      const d = await getDoc(doc(firestore,'hotels',id));
      if(d.exists()) reset(d.data());
    })();
  },[id, reset, firestore]);

  const onSubmit = async (data: any) => {
    if (!firestore) return;
    const docId = id || (data.name && data.name.toLowerCase().replace(/[^a-z0-9]+/g,'-'));
    if (!docId) {
        alert('Hotel name is required to create a new hotel.');
        return;
    }
    const docRef = doc(firestore,'hotels', docId);
    await setDoc(docRef, { ...data, id: docId, updatedAt: new Date() }, { merge: true });
    alert('Saved');
    router.push('/admin/hotels');
  };

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(!file || !firestore) return;

    const hotelIdForPath = id || (document.querySelector('input[name="name"]') as HTMLInputElement)?.value.toLowerCase().replace(/[^a-z0-9]+/g,'-') || 'new';

    const path = `hotels/${hotelIdForPath}/${file.name}`;
    const sref = ref(storage, path);
    const task = uploadBytesResumable(sref, file);
    
    task.on('state_changed', ()=>{}, err=>alert(err.message), async ()=>{
      const url = await getDownloadURL(task.snapshot.ref);
      
      if (id) {
          const docRef = doc(firestore, 'hotels', id);
          const d = await getDoc(docRef);
          const existingImages = d.exists() ? d.data().images || [] : [];
          await setDoc(docRef, { images: [...existingImages, url] }, { merge: true });
          alert('Image uploaded and linked to hotel.');
      } else {
          alert('Image uploaded. Please save the hotel to link the image.');
          // You might want to store the URL temporarily and add it on first save
      }
    });
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-xl font-bold mb-4">{id? 'Edit Hotel' : 'New Hotel'}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-4 rounded shadow space-y-3">
        <label className="block">Name <input {...register('name')} className="w-full border p-2 rounded"/></label>
        <label className="block">Brand <input {...register('brand')} className="w-full border p-2 rounded"/></label>
        <div className="grid grid-cols-2 gap-3">
          <label>City<input {...register('city')} className="w-full border p-2 rounded"/></label>
          <label>State<input {...register('state')} className="w-full border p-2 rounded"/></label>
        </div>
        <label>About<textarea {...register('about')} className="w-full border p-2 rounded"/></label>

        <div>
          <div className="flex justify-between items-center mb-2"> <div className="font-semibold">Room Categories</div> <button type="button" onClick={()=>append({name:'',count:0,size:''})} className="text-sm text-indigo-600">Add</button></div>
          <div className="space-y-2">
            {fields.map((f,i)=> (
              <div key={f.id} className="flex gap-2">
                <input {...register(`roomCategories.${i}.name`)} placeholder="Name" className="border p-2 rounded flex-1"/>
                <input type="number" {...register(`roomCategories.${i}.count`)} placeholder="Count" className="border p-2 rounded w-28"/>
                <input {...register(`roomCategories.${i}.size`)} placeholder="Size" className="border p-2 rounded w-32"/>
                <button type="button" onClick={()=>remove(i)} className="text-red-600">Remove</button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block">Upload Image</label>
          <input type="file" onChange={uploadImage} />
        </div>

        <div className="flex justify-end"><button className="bg-indigo-600 text-white px-4 py-2 rounded">Save</button></div>
      </form>
    </div>
  );
}
