import React from 'react';
import axios from 'axios';

const a = [
  {
    id: '1',
    name: 'Tricep Heavy Exercises',
    childexercises: [
      'null;(Close Grip Bench Press (Barbell),Linear,);(Skull Crushers (Curl Bar/Barbell),Double Progression,);(Dips,Double Progression,)',
    ],
  },
  {
    id: '2',
    name: 'Tricep Light Exercises',
    childexercises: [
      'null;(Straight Bar Pushdown ,Double Progression,);(Reverse Grip Straight Bar Pushdown ,Double Progression,);( Rope Pushdown ,Double Progression,);(Overhead Rope Pull,Double Progression,);(Skull Crushers (Dumbbell),Double Progression,);( Kick Back (Dumbbell),Double Progression,);(Close Grip Push Up,Double Progression,)',
    ],
  },
  {
    id: '3',
    name: 'Bicep Heavy Exercises',
    childexercises: [
      'null;(Standing Bicep Curl (Barbell),Double Progression,);(Preacher Curl (Barbell),Double Progression,)',
    ],
  },
  {
    id: '4',
    name: 'Bicep Light Exercises',
    childexercises: [
      'null;(Standing Bicep Curl (Dumbbell),Double Progression,);(Standing Cable Bicep Curl ,Double Progression,);(Standing Hammer Curl (Dumbbell),Double Progression,);(Seated Hammer Curl (Dumbbell),Double Progression,);(Seated Bicep Curl (Dumbbell),Double Progression,);(Concentration Curl (Dumbbell),Double Progression,);((30 Deg) Incline Bench Bicep Curl (Dumbbell),Double Progression,);(Preacher Curl (Dumbbell),Double Progression,)',
    ],
  },
  {
    id: '5',
    name: 'Chest Heavy',
    childexercises: [
      'null;(Bench Press (Barbell),Linear,);(Decline Bench Press (Barbell),Linear,);(Incline Bench Press (Barbell),Linear,);(Machine Chest Press,Double Progression,);(Flat Chest Press (Dumbbell),Double Progression,);(Decline Chest Press (Dumbbell),Double Progression,);(Incline Chest Press (Dumbbell),Double Progression,)',
    ],
  },
  {
    id: '6',
    name: 'Chest Accessory Press',
    childexercises: [
      'null;(Flat Chest Press (Dumbbell),Double Progression,);(Decline Chest Press (Dumbbell),Double Progression,);(Incline Chest Press (Dumbbell),Double Progression,);(Machine Chest Press,Double Progression,)',
    ],
  },
  {
    id: '7',
    name: 'Chest Light',
    childexercises: [
      'null;(Flat Chest Fly (Dumbbell),Double Progression,);(Decline Chest Fly (Dumbbell),Double Progression,);(Incline Chest Fly (Dumbbell),Double Progression,);(Cable Chest Fly,Double Progression,);(Chest Fly Machine,Double Progression,);(Pec Dec,Double Progression,);(Dips,Double Progression,);( Push Ups,Double Progression,)',
    ],
  },
  {
    id: '8',
    name: 'Shoulder Isolation Exercises',
    childexercises: [
      'null;(Shoulder Front Raise (Dumbbell),Double Progression,);(Shoulder Front Raise (Cable Machine),Double Progression,);(Lateral Raise (Dumbbell),Double Progression,);(Lateral Raise (Machine),Double Progression,);(Single Arm Lateral Raise (Dumbbell),Double Progression,);(Single Arm Lateral Raise (Cable Machine),Double Progression,)',
    ],
  },
  {
    id: '9',
    name: 'Shoulder Rear Delt Isolation Exercises',
    childexercises: [
      'null;((30 Deg) Bench Supported Reverse Fly (Dumbbell),Double Progression,);(Standing Single Arm Rear Deltoids (Cable Machine),Double Progression,);(Bent Over Single Arm Rear Deltoids (Cable Machine),Double Progression,);(Standing Cable Pull Aparts  ,Double Progression,);(Seated Rear Deltoid Fly (Machine),Double Progression,);(Face Pull (Thumbs Pointing Away),Double Progression,);(Face Pull (Thumbs Pointing Towards Head),Double Progression,)',
    ],
  },
  {
    id: '10',
    name: 'Shoulder Compound Exercises',
    childexercises: [
      'null;(Standing Shoulder Press (Barbell),Linear,);(Standing Shoulder Press (Dumbbell),Double Progression,);(Seated Shoulder Press (Barbell),Linear,);(Seated Shoulder Press (Dumbbell),Double Progression,);(Shoulder Press (Machine),Double Progression,)',
    ],
  },
  {
    id: '11',
    name: 'Back Heavy Exercises',
    childexercises: [
      'null;(Bent Over Row (Barbell),Linear,);(Chin Up (Underhand Grip) ,Double Progression,);(Chin Up (Overhand Grip),Double Progression,);(Chin Up (Neutral Grip),Double Progression,);(Assisted Chin-Up (Machine),Double Progression,);(Resistance Band Assisted Chin-Up,Double Progression,)',
    ],
  },
  {
    id: '12',
    name: 'Back Light Exercises',
    childexercises: [
      'null;(Single Arm Row (Dumbbell),Double Progression,);( Chest Supported Row (Dumbbell),Double Progression,);(Lat Pulldown (Underhand + Narrow Grip),Double Progression,);(Lat Pulldown (Regular Overhand Grip),Double Progression,);(Lat Pulldown (Close Grip),Double Progression,);(Seated Cable Row (Neutral Grip) ,Double Progression,);(Seated Cable Row - (Underhand Grip) ,Double Progression,);(Seated Cable Row - (Wide Grip),Double Progression,);(Machine Back Row ,Double Progression,);(Machine Pull Down,Double Progression,)',
    ],
  },
  {
    id: '13',
    name: 'Quadricep Heavy Exercises',
    childexercises: [
      'null;(Front Squat (Barbell),Linear,);(Back Squat (Barbell),Linear,);(Smith Machine Squat,Linear,);(Hack Squat,Linear,);(Leg Press,Linear,);(Conventional Deadlift (Barbell),Linear,);(Sumo Deadlift (Barbell),Linear,);(Trap Bar Deadlift (Trap Bar),Linear,)',
    ],
  },
  {
    id: '14',
    name: 'Quadricep Heavy Compound Accessory Exercises',
    childexercises: [
      'null;(Hack Squat ,Linear,);(Leg Press,Linear,);(Single Leg Legged Press,Linear,);(Smith Machine Squat,Linear,);(Narrow Stance Smith Machine Squat,Linear,)',
    ],
  },
  {
    id: '15',
    name: 'Quadricep Isolation Exercises',
    childexercises: [
      'null;(Leg Extensions,Double Progression,);(Single Legged Leg Extensions ,Double Progression,)',
    ],
  },
  {
    id: '16',
    name: 'Quadricep Uni-Lateral Exercises',
    childexercises: [
      'null;(Leg Extensions (Single Leg),Double Progression,);(Rear Foot Elevated Lunge,Double Progression,);(Front Foot Elevated Lunge ,Double Progression,);(Walking Lunges,Double Progression,);( Static Lunge (Barbell),Double Progression,);(Static Lunge (Dumbbell),Double Progression,)',
    ],
  },
  {
    id: '17',
    name: 'Hamstring Heavy Exercises',
    childexercises: [
      'null;(Romanian Deadlift  (Barbell),Linear,);(Romanian Deadlift  (Dumbbell),Double Progression,);(Nordic Curl,Double Progression,)',
    ],
  },
  {
    id: '18',
    name: 'Hamstring Light Exercises',
    childexercises: [
      'null;(Hamstring Curl ,Double Progression,);(Single Hamstring Curl ,Double Progression,);(Seated Hamstring Curl ,Double Progression,);(Seated Single Leg Hamstring Curl ,Double Progression,)',
    ],
  },
  {
    id: '19',
    name: 'Glute Compound Exercises',
    childexercises: [
      'null;(Glute Bridge (Barbell),Linear,);(Hip Thrust (Barbell),Linear,)',
    ],
  },
  {
    id: '20',
    name: 'Glutes Accessory Exercises',
    childexercises: [
      'null;(Glute Bridge (Single Leg) ,Double Progression,);(Hip Thrust (Single Leg),Double Progression,);(Cable Kickback ,Double Progression,);(Cable Abductions,Double Progression,);(Frog Bridge,Till Failure,);(Glute Kickbacks (Hands And Knees),Till Failure,);(Side Lying Hip Abductions (Resistance Band),Till Failure,);(Banded Crab Walks ,Till Failure,)',
    ],
  },
  {
    id: '21',
    name: 'Calves Exercises',
    childexercises: [
      'null;(Standing Calf Raise,Double Progression,);(Seated Calf Raise,Double Progression,);(Leg Press Calf Press,Double Progression,);(Smith Machine Calf Raise,Double Progression,)',
    ],
  },
  {
    id: '22',
    name: 'Hamstring & Glute Exercises',
    childexercises: [
      'null;(Romanian Deadlift  (Barbell),Linear,);(Romanian Deadlift  (Dumbbell),Double Progression,);(Glute Bridge (Barbell),Linear,);(Hip Thrust (Barbell),Linear,)',
    ],
  },
  {
    id: '23',
    name: 'Abdominal Exercises',
    childexercises: [
      'null;(Crunch With Arms Extended,Double Progression,);(Lying Leg Raises,Double Progression,);(Oblique Side Bends (Dumbbell),Double Progression,);(Standing Cable Russian Twist,Double Progression,);(Palof Press,Double Progression,);(Ab Roller,Till Failure,)',
    ],
  },
  {
    id: '24',
    name: 'Abdominal Failure Exercises',
    childexercises: [
      'null;(Side Plank,Till Failure,);(Plank,Till Failure,);(Swiss Ball Plank ,Till Failure,);(Swiss Ball Crunch ,Till Failure,);(Swiss Ball Knee Tuck ,Till Failure,);(Hanging Leg Raises,Till Failure,);(Side Plank Lifts ,Till Failure,)',
    ],
  },
  {
    id: '25',
    name: 'Back Light + Chest Light Exercise',
    childexercises: [
      'Chest Light;(Flat Chest Fly (Dumbbell),Double Progression,);(Decline Chest Fly (Dumbbell),Double Progression,);(Incline Chest Fly (Dumbbell),Double Progression,);(Cable Chest Fly,Double Progression,);(Chest Fly Machine,Double Progression,);(Pec Dec,Double Progression,);(Dips,Double Progression,)',
      'Back Light Exercises;(Single Arm Row (Dumbbell),Double Progression,);( Chest Supported Row (Dumbbell),Double Progression,);(Lat Pulldown (Underhand + Narrow Grip),Double Progression,);(Lat Pulldown (Regular Overhand Grip),Double Progression,);(Lat Pulldown (Close Grip),Double Progression,);(Seated Cable Row (Neutral Grip) ,Double Progression,);(Seated Cable Row - (Underhand Grip) ,Double Progression,);(Seated Cable Row - (Wide Grip),Double Progression,);(Machine Back Row ,Double Progression,);(Machine Pull Down,Double Progression,)',
    ],
  },
  {
    id: '26',
    name: 'Shoulder Lateral + Tricep Light',
    childexercises: [
      'Shoulder Isolation Exercises;(Shoulder Front Raise (Dumbbell),Double Progression,);(Shoulder Front Raise (Cable Machine),Double Progression,);(Lateral Raise (Dumbbell),Double Progression,);(Lateral Raise (Machine),Double Progression,);(Single Arm Lateral Raise (Dumbbell),Double Progression,);(Single Arm Lateral Raise (Cable Machine),Double Progression,)',
      'Tricep Light Exercises;(Straight Bar Pushdown ,Double Progression,);(Reverse Grip Straight Bar Pushdown ,Double Progression,);( Rope Pushdown ,Double Progression,);(Overhead Rope Pull,Double Progression,);(Skull Crushers (Dumbbell),Double Progression,);( Kick Back (Dumbbell),Double Progression,);(Close Grip Push Up,Double Progression,)',
    ],
  },
  {
    id: '27',
    name: 'Chest Dumbbell Press  + Quad Isolation Extension',
    childexercises: [
      'Chest Accessory Press;(Flat Chest Press (Dumbbell),Double Progression,);(Decline Chest Press (Dumbbell),Double Progression,);(Incline Chest Press (Dumbbell),Double Progression,);(Machine Chest Press,Double Progression,)',
      'Quadricep Isolation Exercises;(Leg Extensions,Double Progression,);(Single Legged Leg Extensions ,Double Progression,)',
    ],
  },
  {
    id: '28',
    name: 'Back Light + Hamstring Light',
    childexercises: [
      'Back Light Exercises;(Single Arm Row (Dumbbell),Double Progression,);( Chest Supported Row (Dumbbell),Double Progression,);(Lat Pulldown (Underhand + Narrow Grip),Double Progression,);(Lat Pulldown (Regular Overhand Grip),Double Progression,);(Lat Pulldown (Close Grip),Double Progression,);(Seated Cable Row (Neutral Grip) ,Double Progression,);(Seated Cable Row - (Underhand Grip) ,Double Progression,);(Seated Cable Row - (Wide Grip),Double Progression,);(Machine Back Row ,Double Progression,);(Machine Pull Down,Double Progression,)',
      'Hamstring Light Exercises;(Hamstring Curl ,Double Progression,);(Single Hamstring Curl ,Double Progression,);(Seated Hamstring Curl ,Double Progression,);(Seated Single Leg Hamstring Curl ,Double Progression,)',
    ],
  },
  {
    id: '29',
    name: 'Lateral Shoulder + Light Biceps',
    childexercises: [
      'Shoulder Isolation Exercises;(Shoulder Front Raise (Dumbbell),Double Progression,);(Shoulder Front Raise (Cable Machine),Double Progression,);(Lateral Raise (Dumbbell),Double Progression,);(Lateral Raise (Machine),Double Progression,);(Single Arm Lateral Raise (Dumbbell),Double Progression,);(Single Arm Lateral Raise (Cable Machine),Double Progression,)',
      'Bicep Light Exercises;(Standing Bicep Curl (Dumbbell),Double Progression,);(Standing Cable Bicep Curl ,Double Progression,);(Standing Hammer Curl (Dumbbell),Double Progression,);(Seated Hammer Curl (Dumbbell),Double Progression,);(Seated Bicep Curl (Dumbbell),Double Progression,);(Concentration Curl (Dumbbell),Double Progression,);((30 Deg) Incline Bench Bicep Curl (Dumbbell),Double Progression,);(Preacher Curl (Dumbbell),Double Progression,)',
    ],
  },
  {
    id: '30',
    name: 'Shoulder Isolation + Glute Isolation',
    childexercises: [
      'Shoulder Isolation Exercises;(Shoulder Front Raise (Dumbbell),Double Progression,);(Shoulder Front Raise (Cable Machine),Double Progression,);(Lateral Raise (Dumbbell),Double Progression,);(Lateral Raise (Machine),Double Progression,);(Single Arm Lateral Raise (Dumbbell),Double Progression,);(Single Arm Lateral Raise (Cable Machine),Double Progression,)',
      'Glutes Accessory Exercises;(Glute Bridge (Single Leg) ,Double Progression,);(Hip Thrust (Single Leg),Double Progression,);(Cable Kickback ,Double Progression,);(Cable Abductions,Double Progression,);(Frog Bridge,Till Failure,);(Glute Kickbacks (Hands And Knees),Till Failure,);(Side Lying Hip Abductions (Resistance Band),Till Failure,);(Banded Crab Walks ,Till Failure,)',
    ],
  },
  {
    id: '31',
    name: 'Bicep Light + Tricep Light',
    childexercises: [
      'Tricep Light Exercises;(Straight Bar Pushdown ,Double Progression,);(Reverse Grip Straight Bar Pushdown ,Double Progression,);( Rope Pushdown ,Double Progression,);(Overhead Rope Pull,Double Progression,);(Skull Crushers (Dumbbell),Double Progression,);( Kick Back (Dumbbell),Double Progression,);(Close Grip Push Up,Double Progression,)',
      'Bicep Light Exercises;(Standing Bicep Curl (Dumbbell),Double Progression,);(Standing Cable Bicep Curl ,Double Progression,);(Standing Hammer Curl (Dumbbell),Double Progression,);(Seated Hammer Curl (Dumbbell),Double Progression,);(Seated Bicep Curl (Dumbbell),Double Progression,);(Concentration Curl (Dumbbell),Double Progression,);((30 Deg) Incline Bench Bicep Curl (Dumbbell),Double Progression,);(Preacher Curl (Dumbbell),Double Progression,)',
    ],
  },
  {
    id: '32',
    name: 'Light Lateral Shoulder + Hamstring Isolation ',
    childexercises: [
      'Shoulder Isolation Exercises;(Shoulder Front Raise (Dumbbell),Double Progression,);(Shoulder Front Raise (Cable Machine),Double Progression,);(Lateral Raise (Dumbbell),Double Progression,);(Lateral Raise (Machine),Double Progression,);(Single Arm Lateral Raise (Dumbbell),Double Progression,);(Single Arm Lateral Raise (Cable Machine),Double Progression,)',
      'Hamstring Light Exercises;(Hamstring Curl ,Double Progression,);(Single Hamstring Curl ,Double Progression,);(Seated Hamstring Curl ,Double Progression,);(Seated Single Leg Hamstring Curl ,Double Progression,)',
    ],
  },
  {
    id: '33',
    name: 'Calves Or Glutes Exercises',
    childexercises: [
      'Calves Exercises;(Standing Calf Raise,Double Progression,);(Seated Calf Raise,Double Progression,);(Leg Press Calf Press,Double Progression,);(Smith Machine Calf Raise,Double Progression,)',
      'Glutes Accessory Exercises;(Glute Bridge (Single Leg) ,Double Progression,);(Hip Thrust (Single Leg),Double Progression,);(Cable Kickback ,Double Progression,);(Cable Abductions,Double Progression,);(Frog Bridge,Till Failure,);(Glute Kickbacks (Hands And Knees),Till Failure,);(Side Lying Hip Abductions (Resistance Band),Till Failure,);(Banded Crab Walks ,Till Failure,)',
    ],
  },
  {
    id: '34',
    name: 'Shoulder Light + Tricep Light',
    childexercises: [
      'Shoulder Isolation Exercises;(Shoulder Front Raise (Dumbbell),Double Progression,);(Shoulder Front Raise (Cable Machine),Double Progression,);(Lateral Raise (Dumbbell),Double Progression,);(Lateral Raise (Machine),Double Progression,);(Single Arm Lateral Raise (Dumbbell),Double Progression,);(Single Arm Lateral Raise (Cable Machine),Double Progression,)',
      'Tricep Light Exercises;(Straight Bar Pushdown ,Double Progression,);(Reverse Grip Straight Bar Pushdown ,Double Progression,);( Rope Pushdown ,Double Progression,);(Overhead Rope Pull,Double Progression,);(Skull Crushers (Dumbbell),Double Progression,);( Kick Back (Dumbbell),Double Progression,);(Close Grip Push Up,Double Progression,)',
    ],
  },
  {
    id: '35',
    name: 'Bicep Light +Glute Isolation',
    childexercises: [
      'Bicep Light Exercises;(Standing Bicep Curl (Dumbbell),Double Progression,);(Standing Cable Bicep Curl ,Double Progression,);(Standing Hammer Curl (Dumbbell),Double Progression,);(Seated Hammer Curl (Dumbbell),Double Progression,);(Seated Bicep Curl (Dumbbell),Double Progression,);(Concentration Curl (Dumbbell),Double Progression,);((30 Deg) Incline Bench Bicep Curl (Dumbbell),Double Progression,);(Preacher Curl (Dumbbell),Double Progression,)',
      'Glutes Accessory Exercises;(Glute Bridge (Single Leg) ,Double Progression,);(Hip Thrust (Single Leg),Double Progression,);(Cable Kickback ,Double Progression,);(Cable Abductions,Double Progression,);(Frog Bridge,Till Failure,);(Glute Kickbacks (Hands And Knees),Till Failure,);(Side Lying Hip Abductions (Resistance Band),Till Failure,);(Banded Crab Walks ,Till Failure,)',
    ],
  },
  {
    id: '36',
    name: 'Calves + Bicep Light',
    childexercises: [
      'Calves Exercises;(Standing Calf Raise,Double Progression,);(Seated Calf Raise,Double Progression,);(Leg Press Calf Press,Double Progression,);(Smith Machine Calf Raise,Double Progression,)',
      'Bicep Light Exercises;(Standing Bicep Curl (Dumbbell),Double Progression,);(Standing Cable Bicep Curl ,Double Progression,);(Standing Hammer Curl (Dumbbell),Double Progression,);(Seated Hammer Curl (Dumbbell),Double Progression,);(Seated Bicep Curl (Dumbbell),Double Progression,);(Concentration Curl (Dumbbell),Double Progression,);((30 Deg) Incline Bench Bicep Curl (Dumbbell),Double Progression,);(Preacher Curl (Dumbbell),Double Progression,)',
    ],
  },
  {
    id: '37',
    name: 'Rear Delt + Glute Isolation',
    childexercises: [
      'Shoulder Rear Delt Isolation Exercises;((30 Deg) Bench Supported Reverse Fly (Dumbbell),Double Progression,);(Standing Single Arm Rear Deltoids (Cable Machine),Double Progression,);(Bent Over Single Arm Rear Deltoids (Cable Machine),Double Progression,);(Standing Rear Deltoids Fly (Cable Machine),Double Progression,);(Seated Rear Deltoid Fly (Machine),Double Progression,);(Face Pull (Thumbs Pointing Away),Double Progression,);(Face Pull (Thumbs Pointing Towards Head),Double Progression,)',
      'Glutes Accessory Exercises;(Glute Bridge (Single Leg) ,Double Progression,);(Hip Thrust (Single Leg),Double Progression,);(Cable Kickback ,Double Progression,);(Cable Abductions,Double Progression,);(Frog Bridge,Till Failure,);(Glute Kickbacks (Hands And Knees),Till Failure,);(Side Lying Hip Abductions (Resistance Band),Till Failure,);(Banded Crab Walks ,Till Failure,)',
    ],
  },
  {
    id: '38',
    name: 'Quad Unilateral + Hamstring Isolation',
    childexercises: [
      'Quadricep Uni-Lateral Exercises;(Leg Extensions (Single Leg),Double Progression,);(Rear Foot Elevated Lunge,Double Progression,);(Front Foot Elevated Lunge ,Double Progression,);(Walking Lunges,Double Progression,);( Static Lunge (Barbell),Double Progression,);(Static Lunge (Dumbbell),Double Progression,)',
      'Hamstring Light Exercises;(Hamstring Curl ,Double Progression,);(Single Hamstring Curl ,Double Progression,);(Seated Hamstring Curl ,Double Progression,);(Seated Single Leg Hamstring Curl ,Double Progression,)',
    ],
  },
  {
    id: '39',
    name: 'Chest Fly + Glute Accessory',
    childexercises: [
      'Chest Light;(Flat Chest Fly (Dumbbell),Double Progression,);(Decline Chest Fly (Dumbbell),Double Progression,);(Incline Chest Fly (Dumbbell),Double Progression,);(Cable Chest Fly,Double Progression,);(Chest Fly Machine,Double Progression,);(Pec Dec,Double Progression,);(Dips,Double Progression,)',
      'Glutes Accessory Exercises;(Glute Bridge (Single Leg) ,Double Progression,);(Hip Thrust (Single Leg),Double Progression,);(Cable Kickback ,Double Progression,);(Cable Abductions,Double Progression,);(Frog Bridge,Till Failure,);(Glute Kickbacks (Hands And Knees),Till Failure,);(Side Lying Hip Abductions (Resistance Band),Till Failure,);(Banded Crab Walks ,Till Failure,)',
    ],
  },
  {
    id: '40',
    name: 'Chest Dumbbell Or Hamstring Isolation',
    childexercises: [
      'Chest Accessory Press;(Flat Chest Press (Dumbbell),Double Progression,);(Decline Chest Press (Dumbbell),Double Progression,);(Incline Chest Press (Dumbbell),Double Progression,);(Machine Chest Press,Double Progression,)',
      'Hamstring Light Exercises;(Hamstring Curl ,Double Progression,);(Single Hamstring Curl ,Double Progression,);(Seated Hamstring Curl ,Double Progression,);(Seated Single Leg Hamstring Curl ,Double Progression,)',
    ],
  },
  {
    id: '41',
    name: 'Light Back + Quad Unilateral',
    childexercises: [
      'Back Light Exercises;(Single Arm Row (Dumbbell),Double Progression,);( Chest Supported Row (Dumbbell),Double Progression,);(Lat Pulldown (Underhand + Narrow Grip),Double Progression,);(Lat Pulldown (Regular Overhand Grip),Double Progression,);(Lat Pulldown (Close Grip),Double Progression,);(Seated Cable Row (Neutral Grip) ,Double Progression,);(Seated Cable Row - (Underhand Grip) ,Double Progression,);(Seated Cable Row - (Wide Grip),Double Progression,);(Machine Back Row ,Double Progression,);(Machine Pull Down,Double Progression,)',
      'Quadricep Uni-Lateral Exercises;(Leg Extensions (Single Leg),Double Progression,);(Rear Foot Elevated Lunge,Double Progression,);(Front Foot Elevated Lunge ,Double Progression,);(Walking Lunges,Double Progression,);( Static Lunge (Barbell),Double Progression,);(Static Lunge (Dumbbell),Double Progression,)',
    ],
  },
  {
    id: '42',
    name: 'Lateral Shoulder Or Glute Isolation ',
    childexercises: [
      'Shoulder Isolation Exercises;(Shoulder Front Raise (Dumbbell),Double Progression,);(Shoulder Front Raise (Cable Machine),Double Progression,);(Lateral Raise (Dumbbell),Double Progression,);(Lateral Raise (Machine),Double Progression,);(Single Arm Lateral Raise (Dumbbell),Double Progression,);(Single Arm Lateral Raise (Cable Machine),Double Progression,)',
      'Glutes Accessory Exercises;(Glute Bridge (Single Leg) ,Double Progression,);(Hip Thrust (Single Leg),Double Progression,);(Cable Kickback ,Double Progression,);(Cable Abductions,Double Progression,);(Frog Bridge,Till Failure,);(Glute Kickbacks (Hands And Knees),Till Failure,);(Side Lying Hip Abductions (Resistance Band),Till Failure,);(Banded Crab Walks ,Till Failure,)',
    ],
  },
  {
    id: '43',
    name: 'Tricep Light Or Glute Isolation ',
    childexercises: [
      'Tricep Light Exercises;(Straight Bar Pushdown ,Double Progression,);(Reverse Grip Straight Bar Pushdown ,Double Progression,);( Rope Pushdown ,Double Progression,);(Overhead Rope Pull,Double Progression,);(Skull Crushers (Dumbbell),Double Progression,);( Kick Back (Dumbbell),Double Progression,);(Close Grip Push Up,Double Progression,)',
      'Glutes Accessory Exercises;(Glute Bridge (Single Leg) ,Double Progression,);(Hip Thrust (Single Leg),Double Progression,);(Cable Kickback ,Double Progression,);(Cable Abductions,Double Progression,);(Frog Bridge,Till Failure,);(Glute Kickbacks (Hands And Knees),Till Failure,);(Side Lying Hip Abductions (Resistance Band),Till Failure,);(Banded Crab Walks ,Till Failure,)',
    ],
  },
  {
    id: '44',
    name: 'Shoulder Compound Or Glute Compound',
    childexercises: [
      'Shoulder Compound Exercises;(Standing Shoulder Press (Barbell),Linear,);(Standing Shoulder Press (Dumbbell),Double Progression,);(Seated Shoulder Press (Barbell),Linear,);(Seated Shoulder Press (Dumbbell),Double Progression,);(Shoulder Press (Machine),Double Progression,)',
      'Glute Compound;(Glute Bridge (Barbell),Linear,);(Hip Thrust (Barbell),Linear,)',
    ],
  },
  {
    id: '45',
    name: 'Chest Dumbbell Or Quad Unilateral',
    childexercises: [
      'Chest Accessory Press;(Flat Chest Press (Dumbbell),Double Progression,);(Decline Chest Press (Dumbbell),Double Progression,);(Incline Chest Press (Dumbbell),Double Progression,);(Machine Chest Press,Double Progression,)',
      'Quadricep Uni-Lateral Exercises;(Leg Extensions (Single Leg),Double Progression,);(Rear Foot Elevated Lunge,Double Progression,);(Front Foot Elevated Lunge ,Double Progression,);(Walking Lunges,Double Progression,);( Static Lunge (Barbell),Double Progression,);(Static Lunge (Dumbbell),Double Progression,)',
    ],
  },
  {
    id: '46',
    name: 'Shoulder Rear Delt + Leg Extensions',
    childexercises: [
      'Shoulder Rear Delt Isolation Exercises;((30 Deg) Bench Supported Reverse Fly (Dumbbell),Double Progression,);(Standing Single Arm Rear Deltoids (Cable Machine),Double Progression,);(Bent Over Single Arm Rear Deltoids (Cable Machine),Double Progression,);(Standing Rear Deltoids Fly (Cable Machine),Double Progression,);(Seated Rear Deltoid Fly (Machine),Double Progression,);(Face Pull (Thumbs Pointing Away),Double Progression,);(Face Pull (Thumbs Pointing Towards Head),Double Progression,)',
      'Quadricep Isolation Exercises;(Leg Extensions,Double Progression,);(Single Legged Leg Extensions ,Double Progression,)',
    ],
  },
  {
    id: '47',
    name: 'Flexibility Exercise  Upper Body',
    childexercises: [
      'null;(Weighted Chest Stretch On Bench ,No model of progression ,);(Wall Shoulder Circumductions ,No model of progression ,);(Face Down Chest Stretch (Scorpions),No model of progression ,);(Foam Roller Thoracic Spine ,No model of progression ,);(Bench Shoulder Flexion Stretch ,No model of progression ,);(Foam Roller Weighted Thoracic Mobility ,No model of progression ,);(Weighted Neck Stretch (Trapezius),No model of progression ,)',
    ],
  },
  {
    id: '48',
    name: 'Mobility Exercise  Upper Body',
    childexercises: [
      'null;(Band Dislocations ,Double Progression,);(Band  ,Double Progression,);(Prone T Lifts ,Double Progression,);(Prone External Rotations ,Double Progression,);(Banded Wall Presses ,Double Progression,)',
    ],
  },
  {
    id: '49',
    name: 'Flexibility Exercise Lower Body',
    childexercises: [
      'null;(Rear Foot Elevated Thigh Stretch ,No model of progression ,);(Standing Hamstring Flossing ,No model of progression ,);(Block Assisted Side Splits ,No model of progression ,);(90:90 Hamstring Stretch ,No model of progression ,);(Pigeon Stretch ,No model of progression ,);(Foam Roller Thigh ,No model of progression ,);(Hamstring Release On Bar,No model of progression ,)',
    ],
  },
  {
    id: '50',
    name: 'Mobility Exercise Lower Body',
    childexercises: [
      'null;(Single Leg Glute Bridges ,Double Progression,);(Single Leg Hip Thrusts (Bench),Double Progression,);(Banded Crab Walks ,Double Progression,);(Wall Marching ,Double Progression,);(Single Leg Tipping Bird ,Double Progression,);(Standing Hip Internal Rotation ,Double Progression,)',
    ],
  },
  {
    id: '51',
    name: 'Posterior Shoulder Failure Exercises',
    childexercises: [
      'null;(Farmers Carry ,Failure,);(Banded  ,Failure,);(Prone Y-W\'S,Failure,)',
    ],
  },
  {
    id: '52',
    name: 'Lunge Exercises',
    childexercises: [
      'null;(Walking Lunges ,Rep Home Exercise Progression,20);(Rear Foot Elevated Lunges,Rep Home Exercise Progression,10);(Front Foot Elevated Lunges ,Rep Home Exercise Progression,10);(Alternate Lunge Jumps ,Rep Home Exercise Progression,10);(Static Lunge,Rep Home Exercise Progression,10);(Step Ups,Rep Home Exercise Progression,15)',
    ],
  },
  {
    id: '53',
    name: 'Squat Exercises',
    childexercises: [
      'null;(Squats Close Stance ,Rep Home Exercise Progression,15);(Squats Normal Stance ,Rep Home Exercise Progression,15);(Sumo Squats ,Rep Home Exercise Progression,15);(Squat Jumps ,Rep Home Exercise Progression,10);(Pistol Squat,Rep Home Exercise Progression,5);(Pistol Squat To Bench,Rep Home Exercise Progression,5)',
    ],
  },
  {
    id: '54',
    name: 'Hip Hinge Exercises',
    childexercises: [
      'null;(Single Legged Stiff Leg Dead-Lift,Rep Home Exercise Progression,10);(Romanian Dead-Lift,Rep Home Exercise Progression,10)',
    ],
  },
  {
    id: '55',
    name: 'Glutes',
    childexercises: [
      'null;(Glute Bridge,Rep Home Exercise Progression,20);(Single Legged Glute Bridge,Rep Home Exercise Progression,10);(Frog Pump,Rep Home Exercise Progression,20);(Side Lying Abduction,Rep Home Exercise Progression,20);(Side Plank With Side Lying Abduction,Rep Home Exercise Progression,10);(Marching Glute Bridge,Rep Home Exercise Progression,20)',
    ],
  },
  {
    id: '56',
    name: 'Leg Failure Exercises',
    childexercises: [
      'null;(Glute Bridges,None,Till Failure);(Squat Pulses ,None,Till Failure);(Lunge Pulses ,None,Till Failure);(Donkey Kicks,None,Till Failure)',
    ],
  },
  {
    id: '57',
    name: 'Easy',
    childexercises: [
      'null;(Wall Push Up (Easy),Rep Home Exercise Progression,10);(Incline Push Up (Easy),Rep Home Exercise Progression,10);( Knee Push Up (Difficult),Rep Home Exercise Progression,10)',
    ],
  },
  {
    id: '58',
    name: 'Hard Push Up',
    childexercises: [
      'null;( (Easy),Rep Home Exercise Progression,10);(Foot Elevated Push Up (Difficult),Rep Home Exercise Progression,10);(Close Grip Push Up (Difficult),Rep Home Exercise Progression,10);(Wide Grip Push Up (Difficult),Rep Home Exercise Progression,10);( Spiderman Push Up (Difficult),Rep Home Exercise Progression,10)',
    ],
  },
  {
    id: '59',
    name: 'Upper Body Failure Exercises (Pull)',
    childexercises: [
      'null;(Prone Y Lift,None,Till Failure);(Prone T Lift ,None,Till Failure);(Prone Y To W,None,Till Failure);(Wall Handstand Hold,None,Till Failure);(Doorway Row Single Arm ,None,Till Failure);(Wall Elbow Push Away ,None,Till Failure)',
    ],
  },
  {
    id: '60',
    name: 'Abdominals Isometric (Till Failure)',
    childexercises: [
      'null;(Side Plank On Knees (Easy),None,Till Failure);(Side Plank (Difficult),None,Till Failure);(Plank On Knees (Easy),None,Till Failure);(Plank (Difficult),None,Till Failure);(Hollow Body Hold (Easy),None,Till Failure);(Hollow Body Hold (Difficult),None,Till Failure);(Dead Bug (Easy) ,None,Till Failure);(Dead Bug (Hard),None,Till Failure)',
    ],
  },
  {
    id: '61',
    name: 'Abdominals Isokinetic ',
    childexercises: [
      'null;(V Ups,Rep Home Exercise Progression,10);(Butterfly Lateral Flexion ,Rep Home Exercise Progression,10);(Side Plank Knee To Elbow,Rep Home Exercise Progression,10);(Side Plank With Knee Flexion,Rep Home Exercise Progression,10);(Lying Leg Raises,Rep Home Exercise Progression,20);(Reverse Crunch,Rep Home Exercise Progression,10);(Crunch With Arms Extended,Rep Home Exercise Progression,10)',
    ],
  },
  {
    id: '62',
    name: 'Conditioning Plyometric Lower ',
    childexercises: [
      'null;(High Knees ,Time Home Exercise Progression ,60 Sec);(Star Jumps ,Time Home Exercise Progression ,60 Sec);(Long Jumps,Time Home Exercise Progression ,60 Sec);(Single Leg Hop,Time Home Exercise Progression ,60 Sec);(Side Squat Jumps,Time Home Exercise Progression ,60 Sec);(Burpees ,Time Home Exercise Progression ,60 Sec)',
    ],
  },
  {
    id: '63',
    name: 'Conditioning Lower Easy',
    childexercises: [
      'null;(High Foot Elevated Glute Bridge,Time Home Exercise Progression ,60 Sec);( Glute Bridge With Leg Extension,Time Home Exercise Progression ,60 Sec);(Hands Overhead Crab Walk ,Time Home Exercise Progression ,60 Sec);(Table Top Bridge,Time Home Exercise Progression ,60 Sec);(Mountain Climber (Feet Slide On Cardboard) ,Time Home Exercise Progression ,60 Sec);(Mountain Climbers ,Time Home Exercise Progression ,60 Sec)',
    ],
  },
  {
    id: '64',
    name: 'Conditioning Lower Hard',
    childexercises: [
      'null;(Wall Push Up Squats ,Time Home Exercise Progression ,30 sec);(Wall Walks ,Time Home Exercise Progression ,30 sec);(Walkout Burpee,Time Home Exercise Progression ,30 sec);( High Foot Elevated Glute Bridge,Time Home Exercise Progression ,30 sec);( Elevated Glute Bridge With Leg Extension ,Time Home Exercise Progression ,30 sec);(Single Arm Table Top Bridge,Time Home Exercise Progression ,30 sec);(Side Squat Jumps Landing On Single Leg,Time Home Exercise Progression ,30 sec)',
    ],
  },
  {
    id: '65',
    name: 'Conditioning Upper Easy',
    childexercises: [
      'null;(Push Up Leg Slides,Time Home Exercise Progression ,60 Sec);(Alternating Arm And Leg Lift,Time Home Exercise Progression ,60 Sec);(Tricep Wall Press,Time Home Exercise Progression ,60 Sec);(Plank Up Downs,Time Home Exercise Progression ,60 Sec);(Hamstring Walk Out,Time Home Exercise Progression ,60 Sec);(Single Arm Thread The Needle,Time Home Exercise Progression ,60 Sec)',
    ],
  },
  {
    id: '66',
    name: 'Conditioning Upper Hard',
    childexercises: [
      'null;(Down Dog To Up Dog ,Time Home Exercise Progression ,30 sec);(Reptile Push Ups ,Time Home Exercise Progression ,30 sec);(Push Up With Alternating Arm And Leg Lift,Time Home Exercise Progression ,30 sec);(Side Plank Push Up,Time Home Exercise Progression ,30 sec);(Floor To Wall,Time Home Exercise Progression ,30 sec);(Wall Handstand Push Up,Time Home Exercise Progression ,30 sec);(Wall Handstand Renegade Row,Time Home Exercise Progression ,30 sec);(Wall Mountain Climbers,Time Home Exercise Progression ,30 sec)',
    ],
  },
  {
    id: '67',
    name: 'Lunge Or Squat',
    childexercises: [
      'Lunge Exercises;(Walking Lunges ,Rep Home Exercise Progression,20);(Rear Foot Elevated Lunges,Rep Home Exercise Progression,10);(Front Foot Elevated Lunges ,Rep Home Exercise Progression,10);(Alternate Lunge Jumps ,Rep Home Exercise Progression,10);(Static Lunge,Rep Home Exercise Progression,10);(Step Ups,Rep Home Exercise Progression,15)',
      'Squat Exercises;(Squats Close Stance ,Rep Home Exercise Progression,15);(Squats Normal Stance ,Rep Home Exercise Progression,15);(Sumo Squats ,Rep Home Exercise Progression,15);(Squat Jumps ,Rep Home Exercise Progression,10);(Pistol Squat,Rep Home Exercise Progression,5);(Pistol Squat To Bench,Rep Home Exercise Progression,5)',
    ],
  },
  {
    id: '68',
    name: 'Push Up Variations ',
    childexercises: [
      'Easy;(Wall Push Up (Easy),Rep Home Exercise Progression,10);(Incline Push Up (Easy),Rep Home Exercise Progression,10);( Knee Push Up (Difficult),Rep Home Exercise Progression,10)',
      'Hard Push Up;( (Easy),Rep Home Exercise Progression,10);(Foot Elevated Push Up (Difficult),Rep Home Exercise Progression,10);(Close Grip Push Up (Difficult),Rep Home Exercise Progression,10);(Wide Grip Push Up (Difficult),Rep Home Exercise Progression,10);( Spiderman Push Up (Difficult),Rep Home Exercise Progression,10)',
    ],
  },
  {
    id: '69',
    name: 'Conditioning Lower Exercises',
    childexercises: [
      'Conditioning Lower Easy;(High Foot Elevated Glute Bridge,Time Home Exercise Progression ,60 Sec);( Glute Bridge With Leg Extension,Time Home Exercise Progression ,60 Sec);(Hands Overhead Crab Walk ,Time Home Exercise Progression ,60 Sec);(Table Top Bridge,Time Home Exercise Progression ,60 Sec);(Mountain Climber (Feet Slide On Cardboard) ,Time Home Exercise Progression ,60 Sec);(Mountain Climbers ,Time Home Exercise Progression ,60 Sec)',
      'Conditioning Lower Hard;(Wall Push Up Squats ,Time Home Exercise Progression ,30 sec);(Wall Walks ,Time Home Exercise Progression ,30 sec);(Walkout Burpee,Time Home Exercise Progression ,30 sec);( High Foot Elevated Glute Bridge,Time Home Exercise Progression ,30 sec);( Elevated Glute Bridge With Leg Extension ,Time Home Exercise Progression ,30 sec);(Single Arm Table Top Bridge,Time Home Exercise Progression ,30 sec);(Side Squat Jumps Landing On Single Leg,Time Home Exercise Progression ,30 sec)',
    ],
  },
  {
    id: '70',
    name: 'Conditioning Upper Exercises',
    childexercises: [
      'Conditioning Upper Easy;(Push Up Leg Slides,Time Home Exercise Progression ,60 Sec);(Alternating Arm And Leg Lift,Time Home Exercise Progression ,60 Sec);(Tricep Wall Press,Time Home Exercise Progression ,60 Sec);(Plank Up Downs,Time Home Exercise Progression ,60 Sec);(Hamstring Walk Out,Time Home Exercise Progression ,60 Sec);(Single Arm Thread The Needle,Time Home Exercise Progression ,60 Sec)',
      'Conditioning Upper Hard;(Down Dog To Up Dog ,Time Home Exercise Progression ,30 sec);(Reptile  ,Time Home Exercise Progression ,30 sec);(Push Up With Alternating Arm And Leg Lift,Time Home Exercise Progression ,30 sec);(Side Plank Push Up,Time Home Exercise Progression ,30 sec);(Floor To Wall,Time Home Exercise Progression ,30 sec);(Wall Handstand Push Up,Time Home Exercise Progression ,30 sec);(Wall Handstand Renegade Row,Time Home Exercise Progression ,30 sec);(Mountain Climber On The Wall ,Time Home Exercise Progression ,30 sec)',
    ],
  },
  {
    id: '71',
    name: 'Glutes Or Legs Failure',
    childexercises: [
      'Glutes;(Glute Bridge,Rep Home Exercise Progression,20);(Single Legged Glute Bridge,Rep Home Exercise Progression,10);(Frog Pump,Rep Home Exercise Progression,20);(Side Lying Abduction,Rep Home Exercise Progression,20);(Side Plank With Side Lying Abduction,Rep Home Exercise Progression,10);(Marching Glute Bridge,Rep Home Exercise Progression,20)',
      'Leg Failure Exercises;(Glute Bridges,None,Till Failure);(Squat Pulses ,None,Till Failure);(Lunge Pulses ,None,Till Failure);(Donkey Kicks,None,Till Failure)',
    ],
  },
  {
    id: '72',
    name: 'Flexibility Exercise  Upper Body ',
    childexercises: [
      'null;(Doorway Chest Stretch ,No progression - reps or time remain the same each week,30-90 sec);(Wall Shoulder Circumductions ,No progression - reps or time remain the same each week,30-90 sec);(Face Down Chest Stretch (Scorpions),No progression - reps or time remain the same each week,30-90 sec);(Bench Shoulder Flexion Stretch ,No progression - reps or time remain the same each week,30-90 sec);(Neck Stretch ,No progression - reps or time remain the same each week,30-90 sec);(Upper Mobility - Ir/Flex/Pro - Er/ Ext/ Ret,No progression - reps or time remain the same each week,30-90 sec);(Towel/ Stick Dislocations ,No progression - reps or time remain the same each week,30-90 sec)',
    ],
  },
  {
    id: '73',
    name: 'Flexibility Exercise Lower Body ',
    childexercises: [
      'null;(Rear Foot Elevated Thigh Stretch ,No progression - reps or time remain the same each week,30-90 sec);(Standing Hamstring Flossing ,No progression - reps or time remain the same each week,30-90 sec);(Wall Assisted Side Splits ,No progression - reps or time remain the same each week,30-90 sec);(90:90 Hamstring Stretch ,No progression - reps or time remain the same each week,30-90 sec);(Pigeon Stretch ,No progression - reps or time remain the same each week,30-90 sec);(Kneeling Lateral Flexion Against Wall ,No progression - reps or time remain the same each week,30-90 sec);(Kneeling Adductor Stretch ,No progression - reps or time remain the same each week,30-90 sec)',
    ],
  },
  {
    id: '74',
    name: 'Mobility Exercise Lower Body ',
    childexercises: [
      'null;(Stepping With Arm Swing - Gait Practice ,No progression - reps or time remain the same each week,30-90 sec);(Single Leg Tipping Bird ,No progression - reps or time remain the same each week,30-90 sec);(Standing Hip Internal Rotation ,No progression - reps or time remain the same each week,30-90 sec)',
    ],
  },
  {
    id: '75',
    name: 'Relaxation ',
    childexercises: [
      'null;(Diaphragmatic Breathing ,No progression - reps or time remain the same each week,5-10 min);(Buteyko Breathing ,No progression - reps or time remain the same each week,5-10 min);(Thoracic Opening With Nasal Breathing ,No progression - reps or time remain the same each week,5-10 min);(Meditation ,No progression - reps or time remain the same each week,5-10 min)',
    ],
  },
  {
    id: '76',
    name: 'Leg Massage ',
    childexercises: [
      'null;(Foam Roller Thigh ,No progression - reps or time remain the same each week,30-90 sec);(Foam Roller Hamstrings ,No progression - reps or time remain the same each week,30-90 sec);(Foam Roller Adductors ,No progression - reps or time remain the same each week,30-90 sec);(Foam Roller Glutes ,No progression - reps or time remain the same each week,30-90 sec)',
    ],
  },
  {
    id: '77',
    name: 'Upper Massage ',
    childexercises: [
      'null;(Foam Roller Lower Back ,No progression - reps or time remain the same each week,30-90 sec);(Foam Roller Posterior Shoulder ,No progression - reps or time remain the same each week,30-90 sec);(Foam Roller Chest ,No progression - reps or time remain the same each week,30-90 sec)',
    ],
  },
  {
    id: '78',
    name: 'Stretching Spine ',
    childexercises: [
      'null;(Mobility Bridge ,No progression - reps or time remain the same each week,30-90 sec);(Spinal Rotations - Knees 90 Deg Lying On Side,No progression - reps or time remain the same each week,30-90 sec);(Foam Roller Thoracic Spine ,No progression - reps or time remain the same each week,30-90 sec);(Cat Camel Stretch ,No progression - reps or time remain the same each week,30-90 sec);(Windmill Stretch ,No progression - reps or time remain the same each week,30-90 sec)',
    ],
  },
  {
    id: '79',
    name: 'Leg Or Upper Massage ',
    childexercises: [
      'Leg Massage ;(Foam Roller Thigh ,No progression - reps or time remain the same each week,30-90 sec);(Foam Roller Hamstrings ,No progression - reps or time remain the same each week,30-90 sec);(Foam Roller Adductors ,No progression - reps or time remain the same each week,30-90 sec);(Foam Roller Glutes ,No progression - reps or time remain the same each week,30-90 sec)',
      'Upper Massage ;(Foam Roller Lower Back ,No progression - reps or time remain the same each week,30-90 sec);(Foam Roller Posterior Shoulder ,No progression - reps or time remain the same each week,30-90 sec);(Foam Roller Chest ,No progression - reps or time remain the same each week,30-90 sec)',
    ],
  },
  {
    id: '80',
    name: 'Lower Body Flexibility Or Mobility ',
    childexercises: [
      'Flexibility Exercise Lower Body ;(Rear Foot Elevated Thigh Stretch ,No progression - reps or time remain the same each week,30-90 sec);(Standing Hamstring Flossing ,No progression - reps or time remain the same each week,30-90 sec);(Wall Assisted Side Splits ,No progression - reps or time remain the same each week,30-90 sec);(90:90 Hamstring Stretch ,No progression - reps or time remain the same each week,30-90 sec);(Pigeon Stretch ,No progression - reps or time remain the same each week,30-90 sec);(Kneeling Lateral Flexion Against Wall ,No progression - reps or time remain the same each week,30-90 sec);(Kneeling Adductor Stretch ,No progression - reps or time remain the same each week,30-90 sec)',
      'Mobility Exercise Lower Body ;(Stepping With Arm Swing - Gait Practice ,No progression - reps or time remain the same each week,30-90 sec);(Single Leg Tipping Bird ,No progression - reps or time remain the same each week,30-90 sec)',
    ],
  },
  {
    id: '81',
    name: 'Upper Body Flexibility Or Mobility ',
    childexercises: [
      'Flexibility Exercise  Upper Body ;(Weighted Chest Stretch On Bench ,No progression - reps or time remain the same each week,30-90 sec);(Wall Shoulder Circumductions ,No progression - reps or time remain the same each week,30-90 sec);(Face Down Chest Stretch (Scorpions),No progression - reps or time remain the same each week,30-90 sec);(Bench Shoulder Flexion Stretch ,No progression - reps or time remain the same each week,30-90 sec)',
      'Mobility Exercise  Upper Body ;(Upper Mobility - Ir/Flex/Pro - Er/ Ext/ Ret,No progression - reps or time remian the same each week,30-90 sec);(Band Or Stick Dislocations ,No progression - reps or time remian the same each week,30-90 sec);(Band Pull Aparts ,No progression - reps or time remain the same each week,30-90 sec);(T Lift Rotations ,No progression - reps or time remain the same each week,30-90 sec)',
    ],
  },
];
class addExercise extends React.Component {
  componentDidMount() {
    console.log(a.length);
    a.forEach((v) => {
      const m = [...v.childexercises.map(i => ({ a: i }))];
      axios.post('/exercise', { fields: { id: v.id, name: v.name, childexercises: m }, status: 'publish' })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => { console.log(err); });
    });
  }

  render() {
    return (
      <div />
    );
  }
}


export default addExercise;
