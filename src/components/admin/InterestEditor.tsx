'use client';
import React, { useEffect } from 'react';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Trash2 } from 'lucide-react';
import type { Interest } from '@/lib/types';
import { useFirestore } from '@/firebase';
import { doc } from 'firebase/firestore';
import { setDocumentNonBlocking } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

interface InterestEditorProps {
  interest?: Interest;
}

function slugify(text: string) {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

const newInterestDefault: Partial<Interest> = {
  name: '',
  description: '',
  image: { src: '', caption: '' },
  tags: [],
};

export default function InterestEditor({ interest }: InterestEditorProps) {
  const router = useRouter();
  const firestore = useFirestore();
  const { toast } = useToast();

  const { register, control, handleSubmit, reset, formState: { isSubmitting } } = useForm<Interest>({
    defaultValues: interest || newInterestDefault
  });

  const { fields: tagFields, append: appendTag, remove: removeTag } = useFieldArray({
      control,
      name: "tags"
  });

  useEffect(() => {
    if (interest) {
      reset(interest);
    } else {
      reset(newInterestDefault);
    }
  }, [interest, reset]);

  const onSubmit: SubmitHandler<Interest> = async (data) => {
    if (!firestore) {
      toast({ variant: 'destructive', title: 'Error', description: 'Firestore not available.' });
      return;
    }

    try {
      let interestData: Interest;
      const interestId = interest?.id || slugify(data.name);

      if (!interestId) {
        toast({ variant: 'destructive', title: 'Error', description: 'Interest name is required to create an ID.' });
        return;
      }

      interestData = {
        ...data,
        id: interestId,
      };

      const interestRef = doc(firestore, 'interests', interestId);
      await setDocumentNonBlocking(interestRef, interestData, { merge: true });
      
      toast({
        title: interest ? 'Interest Updated' : 'Interest Created',
        description: `"${data.name}" has been saved.`
      });
      
      router.push('/admin/interests');
      router.refresh();

    } catch (error: any) {
      console.error("Error saving interest:", error);
      toast({ variant: 'destructive', title: 'Save Failed', description: error.message });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{interest?.id ? 'Edit Interest' : 'Create New Interest'}</CardTitle>
          <CardDescription>Manage interest details for the website.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Interest Name</Label>
              <Input id="name" {...register('name', { required: true })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" {...register('description')} />
            </div>
             <div className="space-y-2">
              <Label htmlFor="image.src">Image URL</Label>
              <Input id="image.src" {...register('image.src')} placeholder="https://example.com/image.jpg"/>
            </div>
             <div className="space-y-2">
              <Label htmlFor="image.caption">Image AI Hint</Label>
              <Input id="image.caption" {...register('image.caption')} placeholder="e.g. beach sunset" />
            </div>

            <section>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Hotel Tags</h3>
                    <Button type="button" variant="outline" onClick={() => appendTag({ value: '' } as any)}>
                        Add Tag
                    </Button>
                </div>
                <div className="space-y-4">
                    {tagFields.map((field, index) => (
                         <div key={field.id} className="grid grid-cols-[1fr,auto] gap-4 items-end">
                            <Input {...register(`tags.${index}` as any)} placeholder="e.g., beach" />
                            <Button type="button" variant="destructive" size="icon" onClick={() => removeTag(index)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            </section>
            
            <div className="flex justify-end gap-4 pt-4">
              <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save Interest'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
