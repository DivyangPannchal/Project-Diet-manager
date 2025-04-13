let navbarDiv = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if(document.body.scrollTop > 40 || document.documentElement.scrollTop > 40){
        navbarDiv.classList.add('navbar-cng');
    } else {
        navbarDiv.classList.remove('navbar-cng');
    }
});


const navbarCollapseDiv = document.getElementById('navbar-collapse');
const navbarShowBtn = document.getElementById('navbar-show-btn');
const navbarCloseBtn = document.getElementById('navbar-close-btn');
// show navbar
navbarShowBtn.addEventListener('click', () => {
    navbarCollapseDiv.classList.add('navbar-collapse-rmw');
});

// hide side bar
navbarCloseBtn.addEventListener('click', () => {
    navbarCollapseDiv.classList.remove('navbar-collapse-rmw');
});

document.addEventListener('click', (e) => {
    if(e.target.id != "navbar-collapse" && e.target.id != "navbar-show-btn" && e.target.parentElement.id != "navbar-show-btn"){
        navbarCollapseDiv.classList.remove('navbar-collapse-rmw');
    }
});

// stop transition and animatino during window resizing
let resizeTimer;
window.addEventListener('resize', () => {
    document.body.classList.add("resize-animation-stopper");
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove("resize-animation-stopper");
    }, 400);
});

const doTips = [
  'Eat a balanced diet with plenty of fruits and vegetables.',
  'Drink plenty of water throughout the day.',
  'Include a variety of foods in your meals for a well-rounded diet.',
  'Plan your meals and snacks ahead of time for healthier choices.',
  'Choose whole grains over refined grains for better nutrition.'
];

const dontTips = [
  'Don\'t eat too much processed or sugary foods.',
  'Don\'t skip meals, especially breakfast.',
  'Don\'t overeat. Listen to your body\'s hunger cues.',
  'Don\'t eat too close to bedtime.',
  'Don\'t drink sugary beverages like soda or fruit juice excessively.'
];

function showRandomTip(action) {
  const tipsDiv = document.getElementById('tips');
  const randomIndex = Math.floor(Math.random() * (action === 'do' ? doTips.length : dontTips.length));
  tipsDiv.textContent = `${action === 'do' ? 'Do' : 'Don\'t'}: ${action === 'do' ? doTips[randomIndex] : dontTips[randomIndex]}`;
}

function generateMealPlan() {
  const meals = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
  const foods = {
    Breakfast: ['Oats Upma with vegetables and nuts','Idli with coconut chutney and sambar','Dosa with mint chutney and tomato chutney','Pongal with vegetable kurma','Upma with mixed vegetables','Rava dosa with onion-tomato chutney','Ven Pongal with brinjal gothsu','Uttapam with coconut chutney','Adai with aviyal','Appam with vegetable stew','Puttu with kadala curry','Ragi dosa with coconut chutney','Kuzhi Paniyaram with tomato chutney','Semiya Upma with coconut chutney','Wheat dosa with mint chutney','Vegetable Sevai with coconut milk','Methi Thepla with yogurt','Vegetable Rava Upma with sambar','Akki Roti with coconut chutney','Banana Dosa with jaggery syrup','Quinoa Upma with mixed vegetables','Moong dal dosa with coriander chutney','Sabudana Khichdi with yogurt','Bread Upma with coconut chutney','Ragi Idiyappam with tomato thokku',
'Besan Chilla with green chutney','Neer Dosa with coconut-jaggery mix','Mixed Millet Pongal with sambar','Oats Upma with tomato chutney','Spinach Pesarattu with ginger chutney','Cabbage Uttapam with coconut chutney',
'Poha (flattened rice) with peas and peanuts','Vegetable Paratha with yogurt','Moong Dal Chilla with mint chutney','Idli with sambar and coconut chutney','Whole Wheat Bread with boiled egg and avocado','Soya Chunks and Vegetable Stuffed Dosa','Ragi (finger millet) Porridge with fruits','Quinoa Upma with mixed vegetables','Vegetable Vermicelli Upma','Egg and vegetable omelet'],
              Lunch: ['Lemon Rice with potato curry','Vegetable Biryani with raita','Tamarind Rice with vadam','Tomato Rice with cucumber raita','Bisibele Bath with boondi raita','Coconut Rice with eggplant curry','Curd Rice with pickle','Spinach Rice with dal tadka','Sambar Rice with papad','Pudina Rice with curd','Pepper Rice with vegetable kootu','Cauliflower Rice with rasam','Ghee Rice with peas masala','Mango Rice with yogurt','Kuthiraivali (Barnyard Millet) Pulao with mixed veg curry','Cabbage Rice with potato fry','Milagu Jeeraga Samba Rice with brinjal curry','Vegetable Pulao with onion raita','Chana Masala Rice with cucumber salad','Millet Lemon Rice with coconut thogayal',
'Kodo Millet Bisi Bele Bath with boondi raita','Quinoa Puliyodarai with curd','Brown Rice with dal makhani','Tomato Quinoa with mixed veg sambar','Curry Leaf Rice with carrot poriyal','Foxtail Millet Lemon Rice with pickle','Jeera Rice with paneer butter masala','Tomato Bath with minty yogurt','Kuska Biryani with onion-tomato raita','Broken Wheat Upma with mixed veg kurma'],
              Dinner: ['Vegetable Korma with chapati','Egg Curry with jeera rice','Palak Paneer with quinoa',
              'Cauliflower Masala with millet roti','Drumstick Sambar with brown rice','Methi Thepla with aloo baingan sabzi',
              'Bhindi Masala with bajra roti','Potato Curry with wheat paratha','Rajma with jeera millet',
              'Spinach Dal with foxtail millet','Mixed Vegetable Curry with quinoa','Tindora Fry with ragi mudde',
              'Aloo Gobi with jowar roti','Chana Dal Curry with pearl millet (bajra) khichdi','Vegetable Bajji with coconut rice',
              'Cabbage Kootu with kuthiraivali (barnyard millet) dosa','Lauki Kofta with whole wheat naan',
              'Keerai Poriyal with kambu (pearl millet) adai','Mushroom Masala with ragi roti','Dal Tadka with barley pulao',
              'Aloo Methi with jowar bhakri','Cucumber Pachadi with ragi kali','Mixed Veg Poriyal with bajra khichdi','Pudalangai Kootu with sorghum (jowar) chapati',
              'Rajma Masala with kuthiraivali (barnyard millet) pulao','Capsicum Masala with little millet (samai) dosa','Dal Makhani with bajra (pearl millet) roti','Vegetable Stew with appam',
              'Chow Chow Kootu with kambu (pearl millet) dosa','Avial with red rice'],

              
              Snack: ['Fruit smoothie', 'Mixed nuts',' Masala Vada with coconut chutney','Murukku with tea or coffee','Kara Sev with masala chai','Poha with green chutney','Banana Bajji with mint chutney','Sundal with buttermilk','Plantain Chips with yogurt dip','Kuzhi Paniyaram with tomato chutney','Ribbon Pakoda with ginger tea','Vazhakkai Bajji with coconut chutney']
        
  };

  const mealList = document.getElementById('meal-list');
  mealList.innerHTML = '';

  meals.forEach(meal => {
      const randomIndex = Math.floor(Math.random() * foods[meal].length);
      const foodItem = foods[meal][randomIndex];
      const listItem = document.createElement('li');
      listItem.textContent = `${meal}: ${foodItem}`;
      mealList.appendChild(listItem);
  });
}