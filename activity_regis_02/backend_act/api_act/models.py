from django.db import models
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
# import datetime


# date_default = datetime.datetime.now()
# date_format = date_default.strftime("%Y-%m-%d %H:%M:%S")

# User = get_user_model()


# Create your models here.

def only_int(value): 
    if value.isdigit()==False:
        raise ValidationError('ID contains characters')

class Activity(models.Model):
    class RegisType(models.IntegerChoices):
        FirstComeFirstServe = 1
        Candidate = 2

    topic = models.CharField(max_length=255,blank=False,null=False)
    description = models.TextField(blank=False,null=False)
    act_place = models.CharField(max_length=255,blank=False,null=False,default='NULL')
    acti_image = models.ImageField(null=False,blank=True)

    # regis_date = models.CharField(max_length=255,blank=False,null=False)
    # act_date = models.CharField(max_length=255,blank=False,null=False)


    start_regis = models.DateTimeField('The beginning of a register time', default=timezone.now)
    end_regis = models.DateTimeField('The end of a register time', default=timezone.now)
    start_act = models.DateTimeField('The beginning of a activity time', default=timezone.now)
    end_act = models.DateTimeField('The end of a activity time', default=timezone.now)
    
    is_regis = models.BooleanField(default=False)
    member_limit = models.SmallIntegerField(blank=False,null=False)
    registered = models.CharField(max_length=3,blank=True,null=True,default=0)
    feedback_link = models.TextField(blank=True,null=True)
    regis_type = models.IntegerField(choices=RegisType.choices,default=1)
    organizer = models.TextField('Organizer ID',max_length=255,blank=True,null=True)
    def __str__(self) -> str:
        return f'{self.topic} id = {self.id}'


# class RegisterUser(models.Model):

#     user = models.OneToOneField(User, on_delete=models.CASCADE)

#     class Gender(models.IntegerChoices):
#         Male = 1
#         Female = 2
#         Others = 3

#     class YearStudy(models.IntegerChoices):
#         year_one = 1
#         year_two = 2
#         year_three = 3
#         year_four = 4
#         year_five = 5
#         year_six = 6
#         Professor = 7

#     user_image = models.ImageField(null=True,blank=True)
    
#     email = models.EmailField(blank=True,null=False) #! NOT
#     password = models.CharField("Password",blank=False, max_length=50,default='password') #! NOT
#     firstname = models.CharField(max_length=255,blank=False,null=False,default='Firstname') #! NOT
#     lastname = models.CharField(max_length=255,blank=False,null=False,default='Lastname') #! NOT
    
#     nickname = models.CharField(max_length=255,blank=False,null=False,default='Nickname')
#     gender = models.IntegerField(choices=Gender.choices,null=True)
#     id_student = models.CharField(max_length=10,validators=[only_int],blank=True,null=True)
#     faculty = models.CharField(max_length=255,blank=True,null=True)
#     year_study = models.IntegerField(choices=YearStudy.choices,default=1)
#     phone_number = models.CharField(max_length=10,validators=[only_int],blank=True,null=True)
#     facebook_id = models.CharField(max_length=255,blank=True,null=True)
#     line_id = models.CharField(max_length=255,blank=True,null=True)

#     registed_date_time = models.DateTimeField('Registered Date Time',blank=True,null=True)
#     isadmin = models.BooleanField('Admin',default=False)


#     activity_set = models.ManyToManyField(Activity)

class User(AbstractUser):
    class Gender(models.IntegerChoices):
        Male = 1
        Female = 2
        Others = 3

    class YearStudy(models.IntegerChoices):
        year_one = 1
        year_two = 2
        year_three = 3
        year_four = 4
        year_five = 5
        year_six = 6
        Professor = 7

    google_image = models.TextField(null=True,blank=True)

    user_image = models.ImageField(null=True,blank=True)

    nickname = models.CharField(max_length=255,blank=False,null=False,default='Nickname')
    gender = models.IntegerField(choices=Gender.choices,null=True)
    id_student = models.CharField(max_length=10,validators=[only_int],blank=True,null=True)
    faculty = models.CharField(max_length=255,blank=True,null=True)
    year_study = models.IntegerField(choices=YearStudy.choices,default=1)
    phone_number = models.CharField(max_length=10,validators=[only_int],blank=True,null=True)
    facebook_id = models.CharField(max_length=255,blank=True,null=True)
    line_id = models.CharField(max_length=255,blank=True,null=True)

    registed_date_time = models.DateTimeField('Registered Date Time',blank=True,null=True)

    activity_set = models.ManyToManyField(Activity)

    def __str__(self):
        return f'id = {self.id} {self.email} {self.id_student}'
