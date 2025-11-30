
'use client';
import React, { useEffect } from 'react';
import { useForm, useFieldArray, SubmitHandler, useWatch } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Trash2, Wand2, Plus } from 'lucide-react';
import type { Interest } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { generateInterestDescriptionAction, saveInterestAction } from '@/app/actions';

interface InterestEditorProps {
  interest?: Interest;
}

const newInterestDefault: Partial<Interest> = {
  name: '',
  description: '',
  image: { src: '', caption: '' },
  tags: [],
};

export default function InterestEditor({ interest }: InterestEditorProps) {
  const router = useRouter();
  const { toast } = useToast();

  const { register, control, handleSubmit, reset, setValue, formState: { isSubmitting } } = useForm<Interest>({
    defaultValues: interest || newInterestDefault
  });

  const { fields: tagFields, append: appendTag, remove: removeTag } = useFieldArray({
      control,
      name: "tags",
  });

  useEffect(() => {
    if (interest) {
      reset(interest);
    } else {
      reset(newInterestDefault);
    }
  }, [interest, reset]);

  const watchedName = useWatch({ control, name: 'name' });

  const handleGenerateDescription = async () => {
    if (!watchedName) {
        toast({ variant: 'destructive', title: "Interest Name Required", description: "Please enter an interest name before generating a description." });
        return;
    }
    const result = await generateInterestDescriptionAction({ name: watchedName });
    if (result.description) {
        setValue('description', result.description);
        toast({ title: "Description Generated", description: "The description has been filled in by AI." });
    } else if (result.error) {
        toast({ variant: 'destructive', title: 'AI Error', description: result.error });
    }
  };

  const onSubmit: SubmitHandler<Interest> = async (data) => {
    const result = await saveInterestAction(interest?.id || null, data);
    
    if (result.success) {
      toast({
        title: result.isNew ? 'Interest Created' : 'Interest Updated',
        description: `"${data.name}" has been saved.`
      });
      router.push('/admin/interests');
      router.refresh();
    } else {
      toast({ variant: 'destructive', title: 'Save Failed', description: result.message });
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
               <div className="flex justify-between items-center">
                    <Label htmlFor="description">Description</Label>
                    <Button type="button" size="sm" variant="ghost" onClick={handleGenerateDescription}>
                        <Wand2 className="mr-2 h-3 w-3" /> Generate with AI
                    </Button>
                </div>
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
                    <Button type="button" variant="outline" onClick={() => appendTag({ value: '' })}>
                         <Plus className="mr-2 h-4 w-4" /> Add Tag
                    </Button>
                </div>
                <div className="space-y-4">
                    {tagFields.map((field, index) => (
                         <div key={field.id} className="grid grid-cols-[1fr,auto] gap-4 items-end">
                            <Input {...register(`tags.${index}.value`)} placeholder="e.g., beach" />
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
