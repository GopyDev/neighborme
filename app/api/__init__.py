import os, tinys3
from datetime import datetime

from flask import (
    Blueprint,
    jsonify,
    make_response,
    render_template,
    request,
    url_for
)
from flask.ext.login import current_user, login_required
from app import db, config
from app.models import Picture, Request, User, Offer

api = Blueprint('api', __name__)

@api.route('/requests', methods=['POST'])
@login_required
def add_requests():
    try:
        user_id = int(request.json['userId'])
    except ValueError:
        return make_response(jsonify({'error': 'Invalid userId'}), 403)
    user = User.query.filter_by(id=user_id).first()
    if user.id != current_user.id:
        return make_response(jsonify({'error': 'User not authenticated'}), 403)

    request_for_help = Request()
    request_for_help.user = user

    if 'amount' in request.json:
        request_for_help.amount = request.json['amount']
    if 'city' in request.json:
        request_for_help.city = request.json['city']
    if 'date' in request.json:
        request_for_help.date = datetime.strptime(request.json['date'], '%Y-%m-%d')
    if 'details' in request.json:
        request_for_help.details = request.json['details']
    if 'street' in request.json:
        request_for_help.street = request.json['street']
    if 'title' in request.json:
        request_for_help.title = request.json['title']
    if 'zipcode' in request.json:
        request_for_help.zipcode = request.json['zipcode']

    db.session.add(request_for_help)
    db.session.commit()

    return request_for_help.to_json()

@api.route('/requests/<int:request_id>', methods=['POST'])
@login_required
def add_offer(request_id):
    # import pdb
    # pdb.set_trace()
    requestobj = Request.query.filter_by(id=request_id).first()

    request_for_help = Offer()
    request_for_help.request = requestobj   

    if 'lmessage_at' in request.json:
        request_for_help.lmessage_at = request.json['lmessage_at']
    if 'offer' in request.json:
        request_for_help.offer = request.json['offer']
    if 'offer_status' in request.json:
        request_for_help.offer_status = request.json['offer_status']
    if 'helpuser_id' in request.json:
        request_for_help.id = request.json['helpuser_id']
    if 'request_id' in request.json:
        request_for_help.request_id = request.json['request_id']

    db.session.add(request_for_help)
    db.session.commit()

    return request_for_help.to_json()

@api.route('/users/<int:user_id>/photos', methods=['POST'])
@login_required
def users_upload_photos(user_id):
    user = User.query.filter_by(id=user_id).first()
    if user.id != current_user.id:
        return make_response(jsonify({'error': 'User not authenticated'}), 403)

    picture_file = request.files['picture']
    filename = picture_file.filename
    extension = filename.rsplit('.', 1)[1]

    picture = Picture()
    picture.extension = extension
    db.session.add(picture)
    db.session.commit()

    user.profile_picture_id = picture.id
    db.session.add(user)
    db.session.commit()

    upload_filename = "users/%d/profile_pictures/%d.%s" % (current_user.id,
        picture.id, extension)

    if os.environ.get('FLASK_ENV') == 'production':
        AWS_ACCESS_KEY = os.environ.get('AWS_ACCESS_KEY')
        AWS_SECRET_KEY = os.environ.get('AWS_SECRET_KEY')
        conn = tinys3.Connection(AWS_ACCESS_KEY, AWS_SECRET_KEY, tls=True)
        conn.upload(upload_filename, picture_file, 'neighborme-photos')
    else:
        save_path = os.path.join(config['UPLOAD_FOLDER'],
            upload_filename)
        if not os.path.exists(os.path.dirname(save_path)):
            os.makedirs(os.path.dirname(save_path))
        picture_file.save(save_path)

    return jsonify({'status': 'OK'})

@api.route('/users/<int:user_id>', methods=['PUT'])
@login_required
def users_update(user_id):
    if not request.json:
        abort(400)
    user = User.query.filter_by(id=user_id).first()
    if user.id != current_user.id:
        return make_response(jsonify({'error': 'User not authenticated'}), 403)

    response = {'status': 'OK'}
    if 'firstName' in request.json:
        user.first_name = request.json['firstName']
    if 'lastName' in request.json:
        user.last_name = request.json['lastName']
    if 'zipcode' in request.json:
        user.zipcode = request.json['zipcode']
    if 'gender' in request.json:
        user.gender = request.json['gender']
    if 'phoneNumber' in request.json:
        user.phone_number = request.json['phoneNumber']
    if 'skills' in request.json:
        skills = map(lambda s: Skill.query.filter_by(name=s).first(),
                request.json['skills'])
        user.skills = skills
    if 'desiredSkills' in request.json:
        skills = map(lambda s: Skill.query.filter_by(name=s).first(),
                request.json['desiredSkills'])
        user.desired_skills = skills
    if 'skillsOther' in request.json:
        user.skills_other = request.json['skillsOther']
    if 'desiredSkillsOther' in request.json:
        user.desired_skills_other = request.json['desiredSkillsOther']
    if 'aboutMe' in request.json:
        user.about_me = request.json['aboutMe']
    if 'helpReason' in request.json:
        user.help_reason = request.json['helpReason']
    if 'signupCompleted' in request.json:
        user.signup_completed = True
        response['redirect'] = url_for('dashboard.browse')

    db.session.add(user)
    db.session.commit()

    return jsonify(response)
