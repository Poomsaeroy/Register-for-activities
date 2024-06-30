from django.contrib import admin

from api_act.models import Activity
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth import get_user_model

from django.utils.translation import gettext, gettext_lazy as _

User = get_user_model()

# from api_act.models import RegisterUser

# Register your models here.

class ActivityAdmin(admin.ModelAdmin):

    fieldsets = [
        ('Topic & Description & Places', {'fields' : ['topic','description','act_place']}),
        ('Image Upload', {'fields':['acti_image']}),
        ('Date Time', {'fields':['start_regis','end_regis','start_act','end_act']}),
        # ('Date Time', {'fields':['regis_date','act_date']}),
        ('Register & Member Limit', {'fields':['feedback_link','regis_type','is_regis','member_limit','registered']}),
        ('Organizer',{'fields':['organizer']}),
    ]

    list_display = ('id','topic','member_limit','registered')

# class RegisterUserAdmin(admin.ModelAdmin):

#     fieldsets = [
#         ('User select',{'fields':['user']}),
#         ('Login informations',{'fields':['email','password']}),
#         ('User Profile',{'fields':['user_image','firstname','lastname','nickname','gender','phone_number','isadmin']}),
#         ('University',{'fields':['id_student','faculty','year_study']}),
#         ('Date Time',{'fields':['registed_date_time']}),
#         ('Social Account',{'fields':['facebook_id','line_id']}),
#         ('Activity',{'fields':['activity_set']})
#     ]

#     list_display = ('email','id_student','id','isadmin')

class RegisterUserAdmin(UserAdmin):
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        (_('Personal info'), {'fields': ('first_name', 'last_name', 'email')}),
        (_('Permissions'), {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),
        }),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),

        ('User Profile',{'fields':['user_image','nickname','gender','phone_number']}),
        ('University',{'fields':['id_student','faculty','year_study']}),
        ('Date Time',{'fields':['registed_date_time']}),
        ('Social Account',{'fields':['facebook_id','line_id']}),
        ('Activity',{'fields':['activity_set']})
    )
    # fieldsets += [
    #     ('Login informations',{'fields':['email','password']}),
    #     ('User Profile',{'fields':['user_image','nickname','gender','phone_number']}),
    #     ('University',{'fields':['id_student','faculty','year_study']}),
    #     ('Date Time',{'fields':['registed_date_time']}),
    #     ('Social Account',{'fields':['facebook_id','line_id']}),
    #     ('Activity',{'fields':['activity_set']})
    # ]

    # list_display = ('email','id_student','id','isadmin')

admin.site.register(Activity,ActivityAdmin)
admin.site.register(User,RegisterUserAdmin)
# admin.site.register(RegisterUser,RegisterUserAdmin)
# admin.site.register(RegisterUser)
