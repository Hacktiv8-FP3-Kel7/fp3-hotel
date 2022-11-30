import useGetHotels from '@app/api-hooks/hotel/hotel.query';
import ToastHelper from '@app/common/helpers/toast';
import Input from '@app/components/elements';
import useYupValidationResolver from '@app/hooks/use-yup-validation-resolver';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as Yup from 'yup';

export default function BookingForm() {
  const defaultValues = React.useMemo(
    () => ({
      name: { like: '' },
      start: '',
      end: '',
      starRating: { gte: 5 },
    }),
    [],
  );

  const yupSchema = React.useMemo(
    () =>
      Yup.object().shape({
        name: Yup.object({ like: Yup.string().required() }),
        start: Yup.string().required(),
        end: Yup.string().required(),
        starRating: Yup.object({ gte: Yup.number().min(0).max(5).required() }),
      }),
    [],
  );

  const resolver = useYupValidationResolver(yupSchema);

  const methods = useForm({
    defaultValues,
    resolver,
    mode: 'all',
  });

  const onSubmit = React.useCallback(async (values: typeof defaultValues) => {
    try {
      //   const {} = useGetHotels({ params: values });
      console.log(values);
      ToastHelper.success('Pencarian Hotel Berhasil');
    } catch (e) {
      ToastHelper.error('Error');
    }
  }, []);

  return (
    <FormProvider {...methods}>
      <Input type="normal" name="name.like" label="Hotel" placeholder="Cari hotel" required />
      <Input type="normal" name="start" label="Check-In" placeholder="YYYY-MM-DD" required />
      <Input type="normal" name="end" label="Check-Out" placeholder="YYYY-MM-DD" required />
      <Input type="numeric" name="starRating.gte" label="Rating" placeholder="Rating" required />
      <Input type="submit" onSubmit={onSubmit} />
    </FormProvider>
  );
}
