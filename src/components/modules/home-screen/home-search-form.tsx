import { getHotels } from '@app/api-hooks/hotel/hotel.model';
import ToastHelper from '@app/common/helpers/toast';
import Input from '@app/components/elements';
import useYupValidationResolver from '@app/hooks/use-yup-validation-resolver';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { RematchDispatcher } from 'redux';
import * as Yup from 'yup';

interface Props {
  onSubmit: (input: getHotels) => void;
}
export default function HomeSearchForm(props: Props) {
  const dispatch = useDispatch<RematchDispatcher>();

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

  const onSubmit = React.useCallback(
    async (values) => {
      try {
        props.onSubmit(values);

        dispatch.auth.addHistory({
          id: +new Date(),
          name: values.name.like,
          starRating: values.starRating.gte,
          end: values.end,
          start: values.start,
          createdAt: new Date(),
        });

        ToastHelper.success('Pencarian Hotel Berhasil');
      } catch (e) {
        ToastHelper.error('Error');
      }
    },
    [dispatch.auth, props],
  );

  return (
    <FormProvider {...methods}>
      <View style={styles.formContainer}>
        <Input type="normal" name="name.like" label="Hotel" placeholder="Cari hotel" required />
        <View style={styles.fullContainer}>
          <View style={[styles.halfContainer, { marginRight: 5 }]}>
            <Input type="normal" name="start" label="Check-In" placeholder="YYYY-MM-DD" required />
          </View>
          <View style={styles.halfContainer}>
            <Input type="normal" name="end" label="Check-Out" placeholder="YYYY-MM-DD" required />
          </View>
        </View>
        <Input type="numeric" name="starRating.gte" label="Rating" placeholder="Rating" required />
        <Input type="submit" onSubmit={onSubmit} />
      </View>
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  fullContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  halfContainer: {
    flex: 1,
  },
});
