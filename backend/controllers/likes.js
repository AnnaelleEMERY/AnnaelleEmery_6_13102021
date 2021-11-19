const Sauce = require("../models/Sauce");

exports.addLikeOrDislike = (req, res, next) => {
    if (req.body.like == 1) { // S'il s'agit d'un like
        Sauce.updateOne(
            { _id: req.params.id },
            {
                $push: { usersLiked: req.body.userId },
                $inc: { likes: req.body.like },
            }
        )
            .then(() => res.status(200).json({ message: "Like ajouté à la sauce" }))
            .catch((error) => res.status(400).json({ error }));
    }

    if (req.body.like == -1) { // S'il s'agit d'un dislike
        Sauce.updateOne(
            { _id: req.params.id },
            {
                $push: { usersDisliked: req.body.userId },
                $inc: { dislikes: 1 },
            }
        )
            .then(() => res.status(200).json({ message: "Dislike ajouté à la sauce" }))
            .catch((error) => res.status(400).json({ error }));
    }

    if (req.body.like == 0) { // S'il s'agit d'annuler un like ou dislike
        Sauce.findOne({ _id: req.params.id })
            .then((sauce) => {
                let usersLikedFound = false;
                for (index = 0; index < sauce.usersLiked.length; index++) {
                    if (sauce.usersLiked[index] == req.body.userId) {
                        usersLikedFound = true;
                    }
                }
                // si l'utilisateur n'est pas dans la liste des userLiked => ça veut dire qu'il a dislike la sauce, alors annuler le vote dans userLiked
                if (usersLikedFound == false) {
                    Sauce.updateOne(
                        { _id: req.params.id },
                        {
                            $pull: { usersDisliked: req.body.userId },
                            $inc: { dislikes: -1 },
                        }
                    )
                        .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
                        .catch((error) => res.status(400).json({ error }));
                } else {
                    Sauce.updateOne(
                        { _id: req.params.id },
                        {
                            $pull: { usersLiked: req.body.userId },
                            $inc: { likes: -1 },
                        }
                    )
                        .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
                        .catch((error) => res.status(400).json({ error }));
                }
            });
    }
};