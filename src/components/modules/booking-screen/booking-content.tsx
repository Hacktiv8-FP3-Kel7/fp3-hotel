import { HotelModel } from '@app/api-hooks/hotel/hotel.model';
import ToastHelper from '@app/common/helpers/toast';
import Input from '@app/components/elements';
import Form from '@app/components/elements/form';
import Header from '@app/components/widgets/header';
import useYupValidationResolver from '@app/hooks/use-yup-validation-resolver';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import BookingPriceSummary from './booking-price-summary';

interface Props {
  hotel: HotelModel;
}
export default function BookingContent(props: Props) {
  const { hotel } = props;
  const dispatch = useDispatch();
  const defaultValues = React.useMemo(
    () => ({
      orderer: '',
      email: '',
      phoneNumber: '',
      days: 0,
      rooms: 0,
      guests: 0,
      price: Math.floor(Math.random() * (1000000 - 200000) * 200000), //get random prices
      totalPrice: 0,
    }),
    [],
  );

  const yupSchema = React.useMemo(
    () =>
      Yup.object().shape({
        orderer: Yup.string().required(),
        email: Yup.string().email().required(),
        phoneNumber: Yup.string().required(),
        days: Yup.number().min(1).required(),
        rooms: Yup.number().min(1).required(),
        guests: Yup.number().min(1).required(),
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
    async (values: typeof defaultValues) => {
      try {
        values.totalPrice = values.price * values.rooms; //generate totalPrice

        dispatch.auth.addBooking({ ...values, ...hotel }); // add to booking

        ToastHelper.success('Booking Hotel Berhasil');
      } catch (e) {
        ToastHelper.error('Error');
      }
    },
    [dispatch.auth, hotel],
  );

  return (
    <Form methods={methods}>
      <ScrollView>
        <Header title="Booking Screen" titleCenter back />
        <View>
          <Input type="normal" name="orderer" label="name" placeholder="name" required />
          <Input type="normal" name="email" label="email" placeholder="email" required />
          <Input type="numeric" name="phoneNumber" label="phone" placeholder="phone" required />
          <Input type="numeric" name="days" label="days" placeholder="days" required />
          <Input type="numeric" name="rooms" label="rooms" placeholder="rooms" required />
          <Input type="numeric" name="guests" label="guests" placeholder="guests" required />
          <Input type="submit" text="Book Now" onSubmit={onSubmit} />
        </View>
        <BookingPriceSummary />
      </ScrollView>
    </Form>
  );
}
