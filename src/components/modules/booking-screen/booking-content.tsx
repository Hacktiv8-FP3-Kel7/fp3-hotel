import { HotelModel } from '@app/api-hooks/hotel/hotel.model';
import ToastHelper from '@app/common/helpers/toast';
import Input from '@app/components/elements';
import Form from '@app/components/elements/form';
import Header from '@app/components/widgets/header';
import useYupValidationResolver from '@app/hooks/use-yup-validation-resolver';
import colors from '@app/styles/color';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import BookingPriceSummary from './booking-price-summary';

interface Props {
  hotel: HotelModel;
}
export default function BookingContent(props: Props) {
  const { hotel } = props;
  const dispatch = useDispatch();
  const { goBack } = useNavigation();

  const defaultValues = React.useMemo(
    () => ({
      orderer: '',
      email: '',
      phoneNumber: '',
      days: 0,
      rooms: 0,
      guests: 0,
      price: Math.floor(Math.random() * (1000000 - 200000) + 200000), //get random prices
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
        values.totalPrice = values.price * values.rooms * values.days; //generate totalPrice

        dispatch.auth.addBooking({ ...values, ...hotel, transactionAt: new Date() }); // add to booking

        ToastHelper.success('Booking Hotel Berhasil');
        goBack();
      } catch (e) {
        ToastHelper.error('Error');
      }
    },
    [dispatch.auth, goBack, hotel],
  );

  return (
    <>
      <Header title="Booking Screen" titleCenter back />
      <Form methods={methods}>
        <ScrollView>
          <View style={styles.cardContainer}>
            <Input type="normal" name="orderer" label="Name" placeholder="name" required />
            <Input type="normal" name="email" label="Email" placeholder="email" required />
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, marginHorizontal: 2 }}>
                <Input type="numeric" name="days" label="Days" placeholder="days" required />
              </View>
              <View style={{ flex: 1, marginHorizontal: 2 }}>
                <Input type="numeric" name="rooms" label="Rooms" placeholder="rooms" required />
              </View>
              <View style={{ flex: 1, marginHorizontal: 2 }}>
                <Input type="numeric" name="guests" label="Guests" placeholder="guests" required />
              </View>
            </View>
            <Input type="numeric" name="phoneNumber" label="Phone" placeholder="phone" required />

            <Input type="submit" text="Book Now" onSubmit={onSubmit} />
          </View>
          <BookingPriceSummary />
        </ScrollView>
      </Form>
    </>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    paddingHorizontal: 36,
    paddingVertical: 24,
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 5,
    borderRadius: 8,
  },
});
