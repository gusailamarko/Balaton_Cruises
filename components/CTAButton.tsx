import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import Modal from "./Modal";
import Alert from "./Alert";
import { CTAButtonText } from "~/constants/texts";
import { supabase } from "~/lib/supabase";

type AlertState = {
  open: boolean;
  type: "success" | "failure" | "empty";
  message: string;
};

type Package = {
  id: string;
  name: string;
  min_people: number;
  max_people: number;
  pricing_type: "couple" | "per_person";
};

type Season = {
  id: string;
  name: string;
  start_month: number;
  start_day: number;
  end_month: number;
  end_day: number;
  season_type: "main" | "pre" | "post" | "prepost";
};

type Price = {
  package_id: string;
  season_id: string;
  weekday: number;
  price: number;
};

const CTAButton = () => {
  const [open, setOpen] = useState(false);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const [packages, setPackages] = useState<Package[]>([]);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [prices, setPrices] = useState<Price[]>([]);

  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  const [allBookings, setAllBookings] = useState<any[]>([]);
  const [fullDates, setFullDates] = useState<Date[]>([]);

  const [alert, setAlert] = useState<AlertState>({
    open: false,
    type: "success",
    message: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    guests: "",
    message: "",
  });

  const isDateSelectable = (date: Date) => {
    if (!selectedPackage) return false;

    const season = getSeason(date);
    if (!season?.id) return false;

    const weekday = date.getDay();

    const priceExists = prices.some(
      (p) =>
        p.package_id === selectedPackage.id &&
        p.season_id === season.id &&
        p.weekday === weekday,
    );

    if (selectedPackage.pricing_type === "couple") {
      const bookingsForDay = allBookings.filter(
        (b) =>
          b.package_id === selectedPackage.id &&
          b.booking_date === date.toISOString().split("T")[0],
      );
      if (bookingsForDay.length > 0) return false;
    }

    const isFull = fullDates.some(
      (d) => d.toDateString() === date.toDateString(),
    );

    return priceExists && !isFull;
  };

  const calculateFullDates = (pkg: Package) => {
    const grouped: Record<string, any[]> = {};

    allBookings.forEach((b) => {
      if (!grouped[b.booking_date]) {
        grouped[b.booking_date] = [];
      }
      grouped[b.booking_date].push(b);
    });

    const result: Date[] = [];

    Object.entries(grouped).forEach(([date, bookings]) => {
      const [y, m, d] = date.split("-");
      const jsDate = new Date(Number(y), Number(m) - 1, Number(d));

      if (pkg.pricing_type === "couple") {
        if (bookings.length > 0) {
          result.push(jsDate);
        }
      } else {
        const total = bookings.reduce((sum, b) => sum + b.total_people, 0);

        if (total >= 6) {
          result.push(jsDate);
        }
      }
    });

    return result;
  };

  const isDateFull = async (date: Date) => {
    const formatted = date.toISOString().split("T")[0];

    const { data } = await supabase
      .from("bookings")
      .select("total_people")
      .eq("booking_date", formatted)
      .in("status", ["pending", "confirmed"]);

    const total = data?.reduce((sum, b) => sum + b.total_people, 0) || 0;

    return total >= 6;
  };

  const showAlert = (type: AlertState["type"], message: string) =>
    setAlert({ open: true, type, message });

  useEffect(() => {
    if (!open) return;

    const fetchData = async () => {
      const { data: booked } = await supabase
        .from("bookings")
        .select("booking_date, total_people, package_id")
        .in("status", ["pending", "confirmed"]);

      if (booked) {
        setAllBookings(booked);
      }

      const { data: pkg } = await supabase.from("packages").select("*");
      const { data: sea } = await supabase.from("seasons").select("*");
      const { data: pri } = await supabase.from("package_prices").select("*");

      console.log("Fetched packages:", pkg);
      console.log("Fetched seasons:", sea);
      console.log("Fetched prices:", pri);

      if (pkg) setPackages(pkg);
      if (sea) setSeasons(sea);
      if (pri) setPrices(pri);
    };

    fetchData();
  }, [open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // YEAR-INDEPENDENT SEASON CALCULATION WITH OFF-SEASON
  const getSeason = (date: Date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();

    console.log("Checking season for date:", date);
    console.log("Month:", month, "Day:", day);
    console.log("Available seasons:", seasons);

    // Öncelikle tanımlı sezonlar içinde ara
    const foundSeason = seasons.find((s) => {
      const startMonth = Number(s.start_month);
      const startDay = Number(s.start_day);
      const endMonth = Number(s.end_month);
      const endDay = Number(s.end_day);

      if (!startMonth || !startDay || !endMonth || !endDay) return false;

      const afterStart =
        month > startMonth || (month === startMonth && day >= startDay);
      const beforeEnd =
        month < endMonth || (month === endMonth && day <= endDay);

      console.log(
        `Checking season ${s.name}: start ${startMonth}/${startDay}, end ${endMonth}/${endDay}`,
      );
      console.log("afterStart:", afterStart, "beforeEnd:", beforeEnd);

      return afterStart && beforeEnd;
    });

    if (foundSeason) {
      console.log("Season found:", foundSeason.name);
      return foundSeason;
    }

    // Eğer hiçbiri bulunamadıysa "Off-season" olarak dön
    console.log("Season not found in defined ranges, returning Off-season");
    return { id: null, name: "Off-season" };
  };

  useEffect(() => {
    if (!selectedPackage) {
      setFullDates([]);
      return;
    }

    const full = calculateFullDates(selectedPackage);
    setFullDates(full);
  }, [selectedPackage, allBookings]);

  // PRICE CALCULATION
  useEffect(() => {
    if (!selectedDate || !selectedPackage || !formData.guests) {
      setTotalPrice(null);
      return;
    }

    const season = getSeason(selectedDate);
    console.log("Selected season:", season);

    const weekday = selectedDate.getDay(); // 0=Sunday ... 6=Saturday
    console.log("Selected weekday:", weekday);

    // Fiyatı bul: Off-season için season.id = null
    const priceRow = prices.find(
      (p) =>
        p.package_id === selectedPackage.id &&
        p.season_id === season.id &&
        p.weekday === weekday,
    );

    console.log("Matched price row:", priceRow);

    if (!priceRow) {
      setTotalPrice(null);
      return;
    }

    if (selectedPackage.pricing_type === "couple") {
      setTotalPrice(priceRow.price);
    } else {
      setTotalPrice(priceRow.price * Number(formData.guests));
    }
  }, [selectedDate, selectedPackage, formData.guests, prices, seasons]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, guests } = formData;

    if (!name || !email || !selectedDate || !guests || !selectedPackage) {
      showAlert("empty", "Please fill in all required fields.");
      return;
    }

    if (Number(guests) < selectedPackage.min_people) {
      showAlert(
        "failure",
        `Minimum ${selectedPackage.min_people} people required.`,
      );
      return;
    }

    if (
      selectedPackage.max_people &&
      Number(guests) > selectedPackage.max_people
    ) {
      showAlert(
        "failure",
        `Maximum ${selectedPackage.max_people} people allowed.`,
      );
      return;
    }

    const season = getSeason(selectedDate);
    if (!season) {
      showAlert("failure", "No season found for this date.");
      return;
    }

    const weekday = selectedDate.getDay();

    const validPrice = prices.find(
      (p) =>
        p.package_id === selectedPackage.id &&
        p.season_id === season.id &&
        p.weekday === weekday,
    );

    if (!validPrice) {
      showAlert(
        "failure",
        "This package is not available on the selected day.",
      );
      return;
    }

    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    const { data: existing } = await supabase
      .from("bookings")
      .select("id, total_people, package_id")
      .eq("booking_date", formattedDate)
      .in("status", ["pending", "confirmed"]);

    if (selectedPackage.pricing_type === "couple") {
      // Aynı gün ve aynı paket için zaten bir rezervasyon var mı?
      const existingCouple = existing?.find(
        (b) => b.package_id === selectedPackage.id,
      );
      if (existingCouple) {
        showAlert(
          "failure",
          "Selected date is already booked for this Couple package.",
        );
        return;
      }
    } else {
      // Grup paketleri: toplam kişi sayısı kontrolü
      const total = existing?.reduce((sum, b) => sum + b.total_people, 0) || 0;
      if (total + Number(guests) > 6) {
        showAlert("failure", "Boat capacity (6 people) exceeded.");
        return;
      }
    }

    const { error } = await supabase.from("bookings").insert([
      {
        package_id: selectedPackage.id,
        booking_date: formattedDate,
        season: season.season_type,
        total_people: Number(guests),
        total_price: totalPrice,
        status: "pending",
        extra_info: formData.message,
      },
    ]);

    if (error) {
      showAlert("failure", error.message);
      return;
    }

    setOpen(false);
    setSelectedDate(undefined);
    setSelectedPackage(null);
    setTotalPrice(null);

    setFormData({
      name: "",
      email: "",
      guests: "",
      message: "",
    });

    showAlert("success", "Booking request created successfully.");
  };

  return (
    <>
      <div className="w-[70vw] text-center">
        <button
          className="ctaButton w-auto h-auto py-3"
          onClick={() => setOpen(true)}
        >
          <p className="ctaButton-text">{CTAButtonText.buttonText}</p>
        </button>
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <span onClick={() => setOpen(false)} className="modalClose">
          X
        </span>

        <div className="modalTitle">
          <h1 className="text-center text-[2rem] font-bold">Booking Request</h1>
        </div>

        <form className="flex flex-col gap-3 mt-5" onSubmit={handleSubmit}>
          <input
            className="inputField"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
          />

          <input
            className="inputField"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
          />

          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={(date) => !isDateSelectable(date)}
            modifiers={{
              available: (date) => selectedPackage && isDateSelectable(date),
              seasonless: (date) => !getSeason(date)?.id,
              full: fullDates,
            }}
            modifiersClassNames={{
              available: "bg-green-500 text-white",
              seasonless: "bg-red-400 text-white",
              full: "bg-red-600 text-white cursor-not-allowed",
            }}
          />

          <select
            className="inputField"
            value={selectedPackage?.id || ""}
            onChange={(e) =>
              setSelectedPackage(
                packages.find((p) => p.id === e.target.value) || null,
              )
            }
          >
            <option value="">Select Package</option>
            {packages.map((pkg) => (
              <option key={pkg.id} value={pkg.id}>
                {pkg.name}
              </option>
            ))}
          </select>

          <input
            className="inputField"
            type="number"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            min={selectedPackage?.min_people || 1}
            max={selectedPackage?.max_people || undefined}
            placeholder="Number of People"
            required
          />

          {totalPrice !== null && (
            <div className="text-lg font-bold text-center">
              Total Price: €{totalPrice}
            </div>
          )}

          <textarea
            className="inputField"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder="Extra Info"
          />

          <input className="submitBtn" type="submit" value="Reserve Now" />
        </form>
      </Modal>

      <Alert
        open={alert.open}
        type={alert.type}
        message={alert.message}
        onClose={() => setAlert((s) => ({ ...s, open: false }))}
      />
    </>
  );
};

export default CTAButton;
